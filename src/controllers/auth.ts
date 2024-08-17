// src/controllers/auth.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const DEFAULT_MAJOR_ID = 'your-default-major-id'; // Substitua por um ID de Major válido do seu banco de dados

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        majorId: DEFAULT_MAJOR_ID
      },
    });
    res.redirect('/login'); // Redireciona para a página de login após o cadastro
  } catch (error: any) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Error signing up user', details: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/major'); // Redireciona para a página de cursos após o login bem-sucedido
  } catch (error: any) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user', details: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

export default { signup, login, logout };

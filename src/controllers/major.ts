import { Request, Response } from 'express';
import { createMajor, getAllMajors, getMajor, updateMajor, removeMajor } from '../services/major';
import { v4 as uuidv4 } from 'uuid';

const index = async (req: Request, res: Response) => {
  try {
    const majors = await getAllMajors();
    res.render('major', {
      title: 'Cursos',
      majors: majors
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const read = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const major = await getMajor(id);
    res.render('major/read', {
      title: 'Detalhes do Curso',
      major: major
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('major/create', {
      title: 'Criar Novo Curso'
    });
  } else {
    try {
      const major = await createMajor(req.body);
      res.redirect('/major');
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const update = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.params;
      const major = await getMajor(id);
      res.render('major/update', {
        title: 'Editar Curso',
        major: major
      });
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const { id } = req.params;
      const major = await updateMajor(id, req.body);
      res.redirect('/major');
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const count = await removeMajor(id);
    res.redirect('/major');
  } catch (err) {
    res.status(500).send(err);
  }
};

const createCookie = (req: Request, res: Response) => {
  if (!('nomeCookie' in req.cookies)) {
    res.cookie('nomeCookie', 'valorCookie', { maxAge: 360000 }); // Cookie expira em 6 minutos
    res.send('Você NUNCA passou por aqui!');
  } else {
    res.send('Você JÁ passou por aqui');
  }
};

const clearCookie = (req: Request, res: Response) => {
  res.clearCookie('nomeCookie');
  res.send('cookie apagado');
};

const uuid = (req: Request, res: Response) => {
  const uniqueId = uuidv4();
  res.send(`UUID: ${uniqueId}`);
};

export default { index, read, create, update, remove, createCookie, clearCookie, uuid };

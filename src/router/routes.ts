// src/router/router.ts
import express from 'express';
import majorController from '../controllers/major';
import authController from '../controllers/auth';
import { ensureAuthenticated } from '../middleware/authMiddleware';

const router = express.Router();

// Auth Routes
router.get('/signup', (req, res) => res.render('auth/signup'));
router.post('/signup', authController.signup);
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// MajorController with authMiddleware
router.get('/major', ensureAuthenticated, majorController.index);
router.get('/major/read/:id', ensureAuthenticated, majorController.read);
router.get('/major/create', ensureAuthenticated, majorController.create);
router.post('/major/create', ensureAuthenticated, majorController.create);
router.get('/major/update/:id', ensureAuthenticated, majorController.update);
router.post('/major/update/:id', ensureAuthenticated, majorController.update);
router.post('/major/remove/:id', ensureAuthenticated, majorController.remove);

router.get('/create-cookie', majorController.createCookie);
router.get('/clear-cookie', majorController.clearCookie);
router.get('/uuid', majorController.uuid);

export default router;

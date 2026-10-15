import { Router } from 'express';
import authControl from '../controllers/authControl.js';
import isTokenValid from '../middleware/isTokenValid.js';
import setUser from '../middleware/setUser.js';

const router = Router();

router.post('/login', authControl.login);
router.get('/tkn/:refreshTkn', authControl.newAccessTkn);
router.post('/password/change', isTokenValid, setUser, authControl.changePassword);
router.put('/profile', isTokenValid, setUser, authControl.updateProfile);

export default router;

import { Router } from 'express';
import noteControl from '../controllers/noteControl.js';
import isTokenValid from '../middleware/isTokenValid.js';
import setUser from '../middleware/setUser.js';

const router = Router();

router.get('/site/:siteId', isTokenValid, noteControl.getForSite);
router.post('/', isTokenValid, setUser, noteControl.create);
router.put('/:id', isTokenValid, noteControl.update);
router.delete('/:id', isTokenValid, noteControl.remove);

export default router;

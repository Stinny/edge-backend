import { Router } from 'express';
import siteControl from '../controllers/siteControl.js';
import isTokenValid from '../middleware/isTokenValid.js';

const router = Router();

router.get('/', isTokenValid, siteControl.getAll);
router.get('/:id', isTokenValid, siteControl.getOne);
router.post('/', isTokenValid, siteControl.create);
router.put('/:id', isTokenValid, siteControl.update);
router.delete('/:id', isTokenValid, siteControl.remove);

export default router;

import { Router } from 'express';
import * as contentController from '../controllers/contentController.js';

const router = Router();

router.get('/', contentController.getContentItems);
// router.post('/', contentController.addContentItem);

export default router;

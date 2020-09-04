import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ClassesController from '../controller/ClassesController';
import ClassesEmblemController from '../controller/ClassesEmblemController';

const classesRouter = Router();
const upload = multer(uploadConfig.multer);
const classesController = new ClassesController();
const classesEmblemController = new ClassesEmblemController();

classesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      name_ascension: Joi.string().required(),
      name_awakening: Joi.string().required(),
    },
  }),
  classesController.create,
);

classesRouter.get('/list', ensureAuthenticated, classesController.list);

classesRouter.patch(
  '/emblem_ascension',
  ensureAuthenticated,
  upload.single('emblem'),
  classesEmblemController.update_emblem_ascension,
);

classesRouter.patch(
  '/emblem_awakening',
  ensureAuthenticated,
  upload.single('emblem'),
  classesEmblemController.update_emblem_awakening,
);

export default classesRouter;

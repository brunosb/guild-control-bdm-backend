import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controller/UsersController';
import UserAvatarController from '../controller/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureLeadersAuthenticated from '../middlewares/ensureLeadersAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      whatsapp: Joi.string(),
      permission: Joi.string().required(),
      cp: Joi.number(),
      classe: Joi.string().required(),
      sub_class: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/list', ensureAuthenticated, usersController.list);

usersRouter.patch(
  '/change-active',
  ensureAuthenticated,
  ensureLeadersAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      active: Joi.boolean().required(),
    },
  }),
  usersController.changeActive,
);

usersRouter.patch(
  '/add-remove-strike',
  ensureAuthenticated,
  ensureLeadersAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      operation: Joi.string().required(),
    },
  }),
  usersController.AddAndRemoveStrike,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;

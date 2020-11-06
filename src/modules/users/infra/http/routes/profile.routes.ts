import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controller/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      whatsapp: Joi.string().required(),
      cp: Joi.string().required(),
      classe: Joi.string().required(),
      sub_class: Joi.string().required(),
      permission: Joi.string().required(),
      password: Joi.string().allow('', null),
    },
  }),
  profileController.update,
);

export default profileRouter;

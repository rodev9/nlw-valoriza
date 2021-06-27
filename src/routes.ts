import { Router } from 'express'

import { CreateUserController } from './controllers/CreateUserController'
import { ListUsersController } from './controllers/ListUsersController'
import { CreateTagController } from './controllers/CreateTagController'
import { ListTagsController } from './controllers/ListTagsController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'

import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { ensureAdmin } from './middlewares/ensureAdmin'

const router = Router()

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const createTagController = new CreateTagController()
const listTagsController = new ListTagsController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController =
  new ListUserSendComplimentsController()
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController()
const authenticateUserController = new AuthenticateUserController()

router.post('/users', createUserController.handle)
router.get('/users', ensureAuthenticated, listUsersController.handle)

router.post(
  '/tags',
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
)
router.get('/tags', ensureAuthenticated, listTagsController.handle)

router.post(
  '/compliments',
  ensureAuthenticated,
  createComplimentController.handle
)
router.get(
  '/compliments/send',
  ensureAuthenticated,
  listUserSendComplimentsController.handle
)
router.get(
  '/compliments/receive',
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
)

router.post('/login', authenticateUserController.handle)

export { router }

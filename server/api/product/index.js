'use strict';

import {Router} from 'express';
import * as controller from './product.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

//this will be needed in the future
//auth.hasRole('admin')

router.get('/suggest', controller.suggest);
router.get('/search',  controller.search);

router.get('/',  controller.index);
router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;

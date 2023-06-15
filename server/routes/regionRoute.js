import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";
import login from "../auth/login";

const router = Router()

router.get('/',login.verify,indexCtrl.regionCtrl.findAll)
router.get('/:ids',login.verify,indexCtrl.regionCtrl.findOne)
router.post('/',indexCtrl.regionCtrl.create,indexCtrl.countryCtrl.create)
router.put('/:id',indexCtrl.regionCtrl.update)
router.delete('/:id',indexCtrl.regionCtrl.deleted)
router.get('/query/:id',indexCtrl.regionCtrl.querySQL)

export default router
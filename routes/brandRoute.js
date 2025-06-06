const express = require('express')
const brandController = require ("../controllers/brandController")
const authmiddleware = require('../middleware/auth')
const multerMiddleware = require('../middleware/multer')
const router = express.Router();


router.post('/create',authmiddleware.auth,multerMiddleware.single('image') ,brandController.createBrand)
router.get('/getAllBrands',brandController.getAllBrands)
router.get('/getBrandByID/:id',brandController.getBrandByID)
router.put('/updateBrand/:id',authmiddleware.auth,multerMiddleware.single('image'),brandController.updateBrand)
router.delete('/deleteBrand/:id',authmiddleware.auth,brandController.deleteBrand)



module.exports = router;
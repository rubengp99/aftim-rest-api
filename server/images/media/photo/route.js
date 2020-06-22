const { Router } = require('express');
const { validar } = require('../../../auth/helpers/authentication')
const router = Router();
const { getPhotosOfGallery,getMainPhoto, insertGalleryPhoto,insertMainPhoto,deleteGalleryPhoto,deleteMainPhoto } = require('./controller');

router.get('/:table/:id', validar, getPhotosOfGallery);
router.get('/main/:table/:id', validar, getMainPhoto);
router.post('/:table/:id', validar, insertGalleryPhoto);
router.post('/main/:table/:id', validar, insertMainPhoto);
router.delete('/:photo', validar, deleteGalleryPhoto);
router.delete('/main/:id', validar, deleteMainPhoto);

module.exports = router;
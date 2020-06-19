const { Router } = require('express');
const router = Router();
const { getPhotosOfGallery,getMainPhoto, insertGalleryPhoto,insertMainPhoto,deleteGalleryPhoto,deleteMainPhoto } = require('./controller');

router.get('/:table/:id',getPhotosOfGallery);
router.get('/main/:table/:id',getMainPhoto);
router.post('/:table/:id',insertGalleryPhoto);
router.post('/main/:table/:id',insertMainPhoto);
router.delete('/:photo',deleteGalleryPhoto);
router.delete('/main/:id',deleteMainPhoto);

module.exports = router;
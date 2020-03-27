const { Router } = require('express');
const router = Router();
const { getPhotosOfGallery,getMainPhoto, insertGalleryPhoto,insertMainPhoto } = require('./controller');

router.get('/:table/:id',getPhotosOfGallery);
router.get('/main/:table/:id',getMainPhoto);
router.post('/:table/:id',insertGalleryPhoto);
router.post('/main/:table/:id',insertMainPhoto);

module.exports = router;
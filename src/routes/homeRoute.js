const express = require('express')
const homeController = require('../Controller/HomeController');
const router = express.Router()
const multer  = require('multer')
const appRoot = require('app-root-path');
const path = require('path');

const whitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/avif'
]

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, appRoot + '/src/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

const fileFilter = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error('file is not allowed'))
  }
  cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

router.get('/', homeController.loadFirstPage);
router.get('/create', homeController.createPage);
router.post('/create/data', homeController.createData);
router.get('/details/:name', homeController.detailsPage);
router.put('/edit', homeController.updateData)
router.get('/upload-file', homeController.uploadFilePage)
router.post('/upload-file/create', upload.single('uploaded_file'), homeController.uploadFile)
router.get('/upload/multi', homeController.uploadMultiPage)
router.post('/upload-file/create/multi', upload.array('uploaded_file_multi', 12), homeController.uploadMultiFile)
router.get('/banhTheCake', homeController.banhTheCake)
module.exports = router;
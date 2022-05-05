const express = require('express')
const meController = require('../Controller/MeController');
const router = express.Router()

router.get('/', meController.loadPage)
router.delete('/delete/:id', meController.deleteUser)
router.get('/trash', meController.trashPage)
router.delete('/trash/delete/:id', meController.deleteTrash)
router.patch('/trash/restore/:id', meController.restoreTrash)

module.exports = router;
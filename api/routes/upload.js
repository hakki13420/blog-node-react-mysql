const { createFolder, upload, isAuthenticated } = require('../middlewares/middlewares')

const router = require('express').Router()

router.post('/', isAuthenticated, createFolder, upload.single('file'), (req, res) => {
  return res.status(200).json(req.file.path)
})

module.exports = router

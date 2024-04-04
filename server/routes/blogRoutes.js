const { Router } = require('express')
const router = Router()
const { createBlog, getAllBlogs,getUserBlogs, getBlogDetails, editBlog, deleteBlog } = require('../controllers/blogController')
const authMiddleWare = require('../middleware/authMiddleWare')


router.get('/', getAllBlogs)
router.get('/users/:id', getUserBlogs)
router.get('/:id', getBlogDetails)
router.post('/create', authMiddleWare, createBlog)
router.patch('/edit/:id', authMiddleWare, editBlog)
router.delete('/delete/:id', authMiddleWare, deleteBlog)

module.exports = router;
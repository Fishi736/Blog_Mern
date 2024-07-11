const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middleware/authMiddleWare')



const { registerUser, loginUser, getUser,getAuthors, changeUserAvatar, editUserDetails
} = require('../controllers/userController')






router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getAuthors)
router.get('/:id', getUser)
router.post('/change-avatar', authMiddleware,changeUserAvatar)
router.patch('/edit-details',authMiddleware, editUserDetails)


module.exports = router;
const router = require('express').Router();

const {
getAllUser,
getUserById,
createUser,
updateUser,
deleteUser,
addFriend,
deleteFriend
} = require('../../controllers/user-controller.js')

router
.route('/')
.get(getAllUser)
.post(createUser)



router
.route('/:id')
.get(getUserById)
.delete(deleteUser)
.put(updateUser)

router
.route('/:userID/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;
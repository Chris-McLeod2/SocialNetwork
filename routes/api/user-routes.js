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
.get(getAllUser) //done
.post(createUser) //done



router
.route('/:id')
.get(getUserById) //done
.delete(deleteUser) //done
.put(updateUser) //done

router
.route('/:userID/friends/:friendId')
.post(addFriend)
.delete(deleteFriend)

module.exports = router;
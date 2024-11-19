const { Router } = require('express');
const controller = require('./controller')

const router = Router();
//get requests:
router.get('/', controller.getUsers);
router.get("/:id", controller.getUserById)

// post rquests (send info)
router.post("/", controller.addUser)

//delete requests
router.delete("/:id", controller.removeUser)

//put requests (update exisitng info)
router.put("/:id", controller.updateUsername)

module.exports = router;
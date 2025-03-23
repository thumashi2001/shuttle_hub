
const express = require('express')
const router = express.Router()


const user = require('../Model/userModel')
const userController = require('../controller/UserController')


router.get("/", userController.getAllUsers)


router.get("/:id", userController.getById)


router.post("/adduser", userController.addUsers)


router.put("/:id", userController.updateUser)


router.delete("/:id", userController.deleteUser)


module.exports = router;


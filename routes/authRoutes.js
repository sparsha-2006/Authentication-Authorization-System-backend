const express = require("express");

const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
    getUsers,
    deleteUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// PUBLIC
router.post("/register", register);
router.post("/login", login);


// STUDENT + ADMIN
router.get("/profile",
    authMiddleware,
    getProfile
);

router.put("/profile",
    authMiddleware,
    updateProfile
);


// ADMIN ONLY
router.get("/users",
    authMiddleware,
    roleMiddleware("admin"),
    getUsers
);

router.delete("/users/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteUser
);

module.exports = router;
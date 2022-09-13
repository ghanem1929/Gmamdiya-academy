const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

/**
 * @route POST api/users
 * @desc Register a user
 * @ccess Public
 */
router.post(
  "/signup",
  body("firstName", "Please add firstName").notEmpty(),
  body("lastName", "Please add lastName").notEmpty(),
  body("email", "Please add a valid email").isEmail(),
  body(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "user already exists" });

      user = new User({ firstName, lastName, email, password });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Export module
module.exports = router;

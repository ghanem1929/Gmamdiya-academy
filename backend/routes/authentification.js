const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const auth = require("../middleware/authentification");

/**
 * @route GET api/auth
 * @desc Get logged in user
 * @ccess Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route POST api/auth
 * @desc Auth user & get token
 * @ccess Public
 */
router.post(
  "/",
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* 
    console.log(req.body); */

    const { name, email, password } = req.body;
    console.log(email);

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials 1" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials 2" });
      }

      const payload = {
        user: { id: user.id },
      };
      console.log(payload);

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: new Date().getTime() + 60 * 1000 },
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

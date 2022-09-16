const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/authentification");
const Player = require("../models/player");
const User = require("../models/user");

/**
 * @route GET api/players
 * @desc Get all users players
 * @ccess Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const players = await Player.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route POST api/players
 * @desc Add new player
 * @ccess Private
 */
router.post(
  "/",
  auth,
  body("FirstName", "First name is required").notEmpty(),
  body("LastName", "Last name is required").notEmpty(),
  body("BirthDate", "birthDate is required").notEmpty(),
  body("Adress", "Adress is required").notEmpty(),
  body("Phone", "Phone is required").notEmpty() /* 
  body("Phone", "Phone is required").isNumeric(), */,
  body("BirthDate", "birthDate not valid").isISO8601("dd/mm/yyyy"),
  body("Group", "group is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { FirstName, LastName, BirthDate, Phone, Address, Group } = req.body;

    try {
      const newPlayer = new Player({
        FirstName,
        LastName,
        BirthDate,
        Group,
        Phone,
        Address,
        user: req.user.id,
      });

      const player = await newPlayer.save();
      res.json(player);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route PUT api/contacts/:id
 * @desc Update Player
 * @ccess Private
 */
router.put("/:id", auth, async (req, res) => {
  const { FirstName, LastName, BirthDate, Group, Address, Phone } = req.body;

  try {
    /* 
      console.log(req.params.id); */
    let player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ msg: "player not found" });

    // Make sure user owns player
    if (player.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorised" });

    if (FirstName) player.FirstName = FirstName;
    if (LastName) player.LastName = LastName;
    if (BirthDate) player.BirthDate = BirthDate;
    if (Address) player.Address = Address;
    if (Phone) player.Phone = Phone;
    if (Group) player.Group = Group;

    contact = await player.save();
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route DELETE api/users/:id
 * @desc Delete player
 * @ccess Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    let player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ msg: "Player not found" });

    // Make sure user owns player
    if (player.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorised" });

    await Player.deleteOne({ _id: req.params.id });

    res.json({ msg: "Player removed" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Export module
module.exports = router;

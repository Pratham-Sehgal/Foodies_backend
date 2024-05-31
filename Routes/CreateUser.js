const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secKey =
  "HareKrishnHareKrishnKrishnKrishnHareHareHareRamHareRamRamRamHareHare";

router.post(
  "/createUser",
  [
    body("name").isLength({ min: 5 }),
    body("password", "incorrect Password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//login router

router.post(
  "/loginUser",
  [
    body("password", "incorrect Password").isLength({ min: 5 }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        return res.status(404).json({ errors: "Enter valid email" });
      }
      const pwdcheck = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (!pwdcheck) {
        return res.status(404).json({ errors: "Enter valid password" });
      }
      const dataId = {
        user: {
          id: userData.id,
        },
      };
      const authToken=jwt.sign(dataId,secKey);
      res.json({ success: true ,authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;

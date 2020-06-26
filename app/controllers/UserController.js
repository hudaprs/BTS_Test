const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * @desc    Register a user
 * @method  POST api/users
 * @access  public
 */
exports.signup = async (req, res) => {
  const {
    username,
    email,
    password,
    phone,
    address,
    city,
    country,
    name,
    postcode
  } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check user
    if (user) return res.status(422).json({ msg: "User already registered" });

    const newUser = new User({
      username,
      email,
      password,
      phone,
      address,
      city,
      country,
      name,
      postcode
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // save the user
    await newUser.save();

    const payload = {
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username
      }
    };

    // Send token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        res
          .status(200)
          .json({ username: newUser.username, email: newUser.email, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Sign in a user
 * @method  POST api/users
 * @access  public
 */
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check user
    if (!user) return res.status(422).json({ msg: "Invalid credentials" });

    // CHeck password
    let isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.status(422).json({ msg: "Invalid credentials" });

    const payload = {
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    };

    // Send token
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        res
          .status(200)
          .json({ username: user.username, email: user.email, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Get all users
 * @method  GET api/users
 * @access  private
 */
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({ msg: "Users list", users });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

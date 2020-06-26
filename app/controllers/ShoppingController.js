const Shopping = require("../models/Shopping");

/**
 * @desc    Get all shopping
 * @method  GET api/shopping
 * @access  private
 */
exports.getAllShopping = async (req, res) => {
  try {
    const shoppings = await Shopping.find({});

    if (shoppings.length === 0)
      return res.status(200).json({ msg: "No shopping data, yet" });

    res.status(200).json({ msg: "Shopping list", shoppings });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Create shopping
 * @method  POST api/shopping
 * @access  public
 */
exports.createShopping = async (req, res) => {
  const { name } = req.body;

  // Simple form validation
  if (!name) return res.status(422).json({ msg: "Please fill all forms" });

  try {
    let newShopping = new Shopping({
      name
    });

    // Save the shopping
    await newShopping.save();

    res.status(201).json({ msg: "Shopping created", data: newShopping });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Get shopping by id
 * @method  GET api/shopping/:id
 * @access  private
 */
exports.getShoppingById = async (req, res) => {
  const { id } = req.params;

  try {
    const shopping = await Shopping.findById(id);
    if (!shopping)
      return res.status(404).json({ msg: `No shopping with ID ${id}` });

    res.status(200).json({ msg: "Shopping detail", shopping });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: `No shopping with ID ${id}` });
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Update shopping
 * @method  PUT api/shopping/:id
 * @access  public
 */
exports.updateShopping = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Simple form validation
  if (!name) return res.status(422).json({ msg: "Please fill all forms" });

  try {
    let shopping = await Shopping.findById(id);
    if (!shopping)
      return res.status(404).json({ msg: `No shopping with ID ${id}` });

    shopping = await Shopping.findByIdAndUpdate(
      id,
      {
        $set: {
          name
        }
      },
      {
        new: true
      }
    );

    res.status(200).json({ msg: "Shopping updated", shopping });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: `No shopping with ID ${id}` });
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * @desc    Delete shopping
 * @method  DELETE api/shopping/:id
 * @access  private
 */
exports.deleteShopping = async (req, res) => {
  const { id } = req.params;

  try {
    let shopping = await Shopping.findById(id);
    if (!shopping)
      return res.status(404).json({ msg: `No shopping with ID ${id}` });

    await Shopping.findByIdAndRemove(id);

    res.status(200).json({ msg: "Shopping deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: `No shopping with ID ${id}` });
    res.status(500).json({ msg: "Server error" });
  }
};

const { Product } = require("../models");

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
    // Знайти всі продукти
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { title } = req.query;
    const product = await Product.findOne({ title: title });
    res.status(200).json(product);
    // Знайти продукти по назві
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
    // Створити новий продукт
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).send("not found");
      return;
    }
    res.status(200).json(product);
    // Знайти продукт по id
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, price, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { title, description, imageUrl, price, category },
      {
        new: true,
      }
    );
    if (!product) {
      res.status(404).send("not found");
      return;
    }
    res.status(201).json(product);
    // Оновити існуючий продукт
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).send("not found");
      return;
    }
    res.status(201).json(product);
    // Видалити існуючий продукт
  } catch (error) {
    next(error);
  }
};

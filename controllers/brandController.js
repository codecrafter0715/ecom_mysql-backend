const Brand = require("../models/brandModel");

const createBrand = async (req, res) => {
  console.log(req.body);
  console.log(req.user.isAdmin, "Is admin ");
  const { name } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    } else {
      const existingBrand = await Brand.findOne({ where: { name } });
      console.log(existingBrand, "existingBrand");
      if (existingBrand) {
        res.status(200).send({ message: "Brand Already exist" });
      } else {
        const newBrand = await Brand.create({ name, image });
        res
          .status(200)
          .send({ message: "Brand Created Successfully", success: true });
      }
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// http://localhost:7000/api/brand/create

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({ order: [["id", "ASC"]] });

    const modifiedBrands = brands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      image: `http://localhost:7000/uploads/${brand.image}`,
    }));

    res.status(200).send({ brands: modifiedBrands, success: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getBrandByID = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findOne({ where: { id } });
    if (!brand) {
      res.status(404).send({ error: "Brand not found" });
    } else {
      res.status(200).send({ brand, success: true });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    }
    const [updated] = await Brand.update({ name }, { where: { id } });

    if (updated) {
      res
        .status(200)
        .send({ message: "Brand updated successfully", success: true });
    } else {
      res.status(404).send({ error: "Brand not found", success: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user.isAdmin) {
      res.status(401).send({ message: "Not Authorized" });
    }
    const deleted = await Brand.destroy({ where: { id } });
    if (!deleted) {
      res.status(404).send({ error: "Brand not found" });
    } else {
      res
        .status(200)
        .send({ message: "Brand deleted successfully", success: true });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Export all functions using CommonJS
module.exports = {
  createBrand,
  getAllBrands,
  getBrandByID,
  updateBrand,
  deleteBrand,
};


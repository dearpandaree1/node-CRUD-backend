const express = require("express");
const addressesController = require("../controller/address-controller");
const router = express.Router();
const multer = require("multer");

const upload = multer();

router.get("/", addressesController.getAddress);
router.get("/:addressId", addressesController.getAddressById);
router.post("/", upload.none(), addressesController.createAddress);
router.delete("/:addressId", addressesController.deleteAddress);
router.patch("/:addressId", upload.none(), addressesController.editAddress);

module.exports = router;

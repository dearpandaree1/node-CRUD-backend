const prisma = require("../model/prisma");
const pointer = require("json-pointer")

exports.getAddress = async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({});
    // const addresses = await prisma.address.findMany({
    //   where: {
    //     addressId: +req.address.id,
    //   },
    // });
    console.log("connected");
    res.status(200).json({ addresses });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAddressById = async (req, res, next) => {
  const addressId = req.params.addressId;
  try {
    const address = await prisma.address.findUnique({
      where: {
        id: +addressId,
      },
    });
    console.log(address);
    // console.log(res)
    res.status(200).json({ address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.createAddress = async (req, res, next) => {
  console.log("req.body", req.body);

  try {
      let firstNameReq;
      let lastNameReq;
      let phoneNumberReq;
      let address1Req;
      let address2Req;
      let cityReq;
      let zipCodeReq;
  
      // if (Array.isArray(req.body.firstName) === true) {
      //   firstNameReq = req.body.findName.join(" ")
      //   console.log(firstNameReq, "if")
      // } else {
      //   firstNameReq = req.body.findName
      //   console.log(firstNameReq , "else")
      // }
      if (Array.isArray(pointer.get(req.body, '/firstName')) === true) {
        firstNameReq = pointer.get(req.body, '/firstName').join(" ")
        console.log(firstNameReq, "if")
      } else {
        firstNameReq = pointer.get(req.body, '/firstName')
        console.log(firstNameReq , "else")
      }

      if (Array.isArray(pointer.get(req.body, '/lastName')) === true) {
        lastNameReq = pointer.get(req.body, '/lastName').join(" ")
        console.log(lastNameReq, "if")
      } else {
        lastNameReq = pointer.get(req.body, '/lastName')
        console.log(lastNameReq , "else")
      }

      if (Array.isArray(pointer.get(req.body, '/phoneNumber')) === true) {
         phoneNumberReq = pointer.get(req.body, '/phoneNumber').join(" ")
         console.log(phoneNumberReq, "if")
      } else {
        phoneNumberReq = pointer.get(req.body, '/phoneNumber')
        console.log(phoneNumberReq, "else")
      }

      if (Array.isArray(pointer.get(req.body, '/address1')) === true) {
         address1Req = pointer.get(req.body, '/address1').join(" ")
         console.log(address1Req, "if")
      } else {
        address1Req = pointer.get(req.body, '/address1')
        console.log(address1Req , "else")
      }
      
      if (Array.isArray(pointer.get(req.body, '/address2')) === true) {
         address2Req = pointer.get(req.body, '/address2').join(" ")
         console.log(address2Req, "if")
      } else {
        address2Req = pointer.get(req.body, '/address2')
        console.log(address2Req , "else")
      }

      if (Array.isArray(pointer.get(req.body, '/city')) === true) {
         address2Req = pointer.get(req.body, '/city').join(" ")
         console.log(address2Req, "if")
      } else {
        cityReq = pointer.get(req.body, '/city')
        console.log(cityReq, "else")
      }

      if (Array.isArray(pointer.get(req.body, '/zipCode')) === true) {
         zipCodeReq = pointer.get(req.body, '/zipCode').join(" ")
         console.log(zipCodeReq, "if")
      } else {
        zipCodeReq = pointer.get(req.body, '/zipCode')
        console.log(zipCodeReq, "else")
      }

    const address = await prisma.address.create({
      data: {
        firstName: firstNameReq,
        lastName: lastNameReq,
        phoneNumber: phoneNumberReq,
        address1: address1Req,
        address2: address2Req,
        city: cityReq,
        zipCode: parseInt(zipCodeReq),
      },
    });
    console.log("address id: ",address.id);
    res.status(200).json({ msg: "create address successfully", address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  const addressId = +req.params.addressId;
  console.log(addressId);
  try {
    const address = await prisma.address.delete({
      where: {
        id: addressId,
      },
    });
    console.log(address);
    res.status(200).json({ msg: "delete address successfully", address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.editAddress = async (req, res, next) => {
  const addressId = +req.params.addressId;
  console.log(addressId);
  console.log("Form Data", req.body);

  try {
    const address = await prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        zipCode: parseInt(req.body.zipCode, 10),
      },
    });

    res.status(200).json({ msg: "edit address successfully", address });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

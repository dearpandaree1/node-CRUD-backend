const prisma = require("../model/prisma")

// exports.getAddress = async (req, res, next) => {
//     try {
//         // const addresses = await prisma.address.findMany()
//         // const addresses = await prisma.address.findMany({
//         //     where: {
//         //         addressId: +req.address.id
//         //     }
//         // })
//         // console.log(addresses)
//         res.status(200).json({msg: "test get addresses"})
//         // res.status(200).json()
//     } catch (err) {
//         console.log(err)
//         next(err)
//     }
// } 

exports.getAddress = async (req, res, next) => {
    try {
        const addresses = await prisma.address.findMany({
            select: {
                    firstName:  true
                }
            })
        // const addresses = await prisma.address.findMany({
        //     where: {
        //         addressId: +req.address.id
        //     }
        // })
        console.log(addresses)
        // res.status(200).json(JSON.stringify(addresses))
        res.status(200).json( addresses )
    } catch (err) {
        console.log(err)
        next(err)
    }
} 

exports.getAddressById = async (req, res, next) => {
    const addressId = +req.params.addressId
    try {
        
        const address = await prisma.address.findUnique({
            where: {
                id: addressId
            }
        })
        console.log(address)
        // console.log(res)
        res.status(200).json({ address })
    } catch (err) {
        console.log(err)
        next(err)
    }
} 
exports.createAddress = async (req, res, next) => {
    console.log("req.body",req.body)
    try {
        const address = await prisma.address.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                zipCode: req.body.zipcode
            }
        })
        console.log(address.id)
        res.status(200).json({ msg: "create address successfully" , address})
    }catch (err) {
        console.log(err)
        next(err)
    }
}
exports.deleteAddress = async (req, res, next) => {
    const { addressId } = +req.params;
    console.log(addressId)
    try {
        const address = await prisma.address.delete({
         where : {
            id: addressId
         }
        })
        console.log(address)
        res.status(200).json({ msg: "delete address successfully" , address})
    }catch (err) {
        console.log(err)
        next(err)
    }
}
exports.editAddress = async (req, res, next) => {
    const { addressId } = +req.params;
    console.log(addressId)
    try {
        const address = await prisma.address.update({
            where: {
                id : addressId
            },
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                address1: req.body.address1,
                address2: req.body.address2,
                city: req.body.city,
                zipCode: req.body.zipcode
            }
        })
    console.log(address, "here")
    res.status(200).json({ msg: "edit address successfully" , address})

    } catch (err) {
        console.log(err)
        next(err)
    }
}
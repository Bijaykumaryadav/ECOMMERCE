const { sendResponse } = require("../../utils/sendResponse");
const Address = require("../../models/Address");


const addAddress = async(req,res) => {
    try{
      const {userId,address,city,pincode,phone,notes} = req.body;
      if(!userId || !address || !city || !pincode || !phone || !notes){
        return sendResponse(
          res,
          400,
          false,
          "Invalid data provided",
          null,
          null
        )
      }
      const newlyCreatedAddress = new Address({
        userId,
        address,
        city,
        pincode,
        notes,
        phone
      })
      await newlyCreatedAddress.save();
      return sendResponse(
        res,
        201,
        true,
        "Successfully created address",
        {data: newlyCreatedAddress},
        null
      )
    }catch(error){
      console.log("Error is",error);
    return sendResponse(
      res,
      500,
      false,
      "Error in adding address",
      null,
      { error }
    );
    }
}

const fetchAllAddress = async(req,res) => {
    try{
      const {userId} = req.params;
      if(!userId){
        return sendResponse(
          res,
          400,
          false,
          "userId is required",
          null,
          null
        )
      }

      const addressList = await Address.find({userId});

      if(!addressList){
        return sendResponse(
          res,
          404,
          false,
          "No address found",
          null,
          null
        )
      }

      return sendResponse(
        res,
        200,
        true,
        "Successfully fetched the Address",
        {data : addressList},
        null
      )

    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in adding address",
      null,
      { error }
    );
    }
}

const editAddress = async(req,res) => {
    try{

      const {userId,addressId} = req.params;
      const formData = req.body;
        if(!userId || !addressId){
        return sendResponse(
          res,
          400,
          false,
          "User Id and Address Id is required",
          null,
          null
        )
      }

      const address = await Address.findOneAndUpdate({_id: addressId,userId},formData,{new: true});

      if(!address){
        return sendResponse(
          res,
          404,
          false,
          "No address found",
          null,
          null
        )
      }

      sendResponse(
        res,
        200,
        true,
        "Successfully edited the address",
        {data : address},
        null
      )

    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in adding address",
      null,
      { error }
    );
    }
}

const deleteAddress = async(req,res) => {
    try{
      const {userId,addressId} = req.params;
        if(!userId || !addressId){
        return sendResponse(
          res,
          400,
          false,
          "User Id and Address Id is required",
          null,
          null
        )
      }
      const address = await Address.findOneAndDelete({_id: addressId,userId});
      if(!address){
        return sendResponse(
          res,
          404,
          false,
          "No address found",
          null,
          null
        )
      }
      sendResponse(
        res,
        200,
        true,
        "Successfully deleted the address",
        {data : address},
        null
      )
    }catch(error){
    return sendResponse(
      res,
      500,
      false,
      "Error in delete address",
      null,
      { error }
    );
    }
}

module.exports = {addAddress,fetchAllAddress,editAddress,deleteAddress};
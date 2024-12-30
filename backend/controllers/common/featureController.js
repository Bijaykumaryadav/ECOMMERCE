const Feature = require("../../models/Feature");
const { sendResponse } = require("../../utils/sendResponse");


const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
    return sendResponse(
        res,
        201,
        true,
        "Features image saved",
        {data: featureImages},
        null
    );
  } catch (e) {
    console.log(e);
    return sendResponse(
      res,
      500,
      false,
      "Some Error Occured",
      null,
      { error }
    );
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});
    return sendResponse(
        res,
        200,
        true,
        "Features image fetched",
        {data: images},
        null
    );
  } catch (e) {
    console.log(e);
    return sendResponse(
      res,
      500,
      false,
      "Some Error Occured",
      null,
      { error }
    );
  }
};

module.exports = { addFeatureImage, getFeatureImages };
// * MODEL LISTING
import Listing from "../models/listing.model.js";
// ! HANDLE ERROR
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, "Listing not found!"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only delete your own listings!"));

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only update your own listings!"));

  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let category = req.query.category;

    if (category === undefined || category === "all") {
      category = {
        $in: ["mouse", "teclado", "auriculares", "silla", "mousepad"],
      };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      category,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

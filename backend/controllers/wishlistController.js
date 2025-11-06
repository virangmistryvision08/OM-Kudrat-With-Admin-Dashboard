const { default: mongoose } = require("mongoose");
const Wishlist = require("../models/wishlistModel");

const get_all_wishlists = async (req, res) => {
    try {
        const userId = req.user._id;

        const findUser = await Wishlist.findOne({ userId });
        if (!findUser) {
            return res
                .status(400)
                .json({ status: false, message: "Not Have An Wishlist!" });
        } else {
            const wishlistItems = await Wishlist.aggregate([
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(userId),
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "items.productId",
                        foreignField: "_id",
                        as: "productinfo"
                    }
                },
                {
                    $unwind: "$productinfo"
                },
                {
                    $group: {
                        _id: "$userId",
                        userId: { $first: "$userId" },
                        products: {
                            $push: {
                                productId: "$productinfo._id",
                                productName: "$productinfo.productName",
                                productImage: "$productinfo.productImage",
                                productOldPrice: "$productinfo.productOldPrice",
                                productNewPrice: "$productinfo.productNewPrice"
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ]
            );

            if (wishlistItems.length === 0) {
                return res.status(200).json({
                    status: true,
                    data: wishlistItems,
                    message: "Empty Wishlist!",
                });
            }

            return res.status(200).json({
                status: true,
                data: wishlistItems,
                message: "Get All Wishlists Successfully!",
            });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};

const toggle_wishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            await Wishlist.create({
                userId,
                items: [{ productId }],
            });
            return res.status(200).json({ status: true, message: "Product added to wishlist." });
        }
        const itemIndex = wishlist.items.findIndex(
            (item) => item.productId.toString() === productId
        );
        if (itemIndex > -1) {
            wishlist.items.splice(itemIndex, 1);
            await wishlist.save();
            return res.status(200).json({ status: true, message: "Product removed from wishlist." });
        } else {
            wishlist.items.push({ productId });
            await wishlist.save();
            return res.status(200).json({ status: true, message: "Product added to wishlist." });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = {
    get_all_wishlists,
    toggle_wishlist,
};

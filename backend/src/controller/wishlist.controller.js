const User = require('../model/user.model');

exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "user not found"
            });
        }

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({
                error: "Product already in wishlist"
            });
        }
        user.wishlist.push(productId);
        await user.save();
        res.status(200).json("Added to wishlist");
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('wishlist');

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        await User.findByIdAndUpdate(userId, {
            $pull: { wishlist: productId }
        });
        res.status(200).json("Removed");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
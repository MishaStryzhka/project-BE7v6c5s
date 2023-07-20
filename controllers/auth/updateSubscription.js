const { User } = require("../../models");

const updateSubscription = async (req, res, next) => {
    const {subscription} = req.body
    console.log('subscription', subscription)
    const result = await User.findByIdAndUpdate(req.user._id, {subscription}, { new: true });
    res.status(200).json(result);
};

module.exports = updateSubscription;
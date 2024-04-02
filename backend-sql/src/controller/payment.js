const Payment = require("..//module/payment");
const User = require("..//module/user");
require("dotenv").config();
const { newToken } = require("..//util/token");
const razorpay = require("razorpay");

const PaymentController = async (req, res) => {
  try {
    const user = req.user;
    const rzp = new razorpay({
      key_id: process.env.RAZOR_ID,
      key_secret: process.env.RAZOR_SECRET,
    });

    const rzpOrder = await rzp.orders.create({
      amount: 2500,
      currency: "INR",
    });

    const payment = await Payment.create({
      orderId: rzpOrder.id,
      paymentStatus: "Pending",
      UserId: user.id,
    });

    return res.status(200).send({ payment, key_id: rzp.key_id });
  } catch (err) {
    return res.status(500).send("internal server error");
  }
};
const UpdatePayment = async (req, res) => {
  try {
      const user=req.user
      await Payment.update({paymentId:req.body.paymentId,paymentStatus:req.body.paymentStatus},{
        where:{
            orderId:req.body.orderId,
        }
      })
      await User.update({isPremium:true},{
        where:{
            id:user.id,
        }
      })
      return res.status(200).send("Your have premium membership")


  } 
  catch (err) {
    return res.status(500).send("internal server error");
  }
};

module.exports = { PaymentController,UpdatePayment };

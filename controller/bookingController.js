const planModel = require("../model/planModel");
const stripe = require('stripe')("sk_test_oxCDkOKCvjDWBA5sLytfisg900A3P6rxTW");
module.exports.checkout = async function (req, res) {
  const id = req.body.id;
  const plan = await planModel.findById(id);
  console.log(plan);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: plan.name,
      description: plan.description,
      amount: plan.price * 100,
      currency: 'usd',
      quantity: 1,
    }],
    /* success_url: '/',
    cancel_url: '/', */
    success_url: `${req.protocol}://${req.get('host')}`,
    cancel_url: `${req.protocol}://${req.get('host')}`
  });
  res.status(201).json({
    data: plan,
    success: "payment object send",
    session
  });

};
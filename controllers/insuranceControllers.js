import InsurancePlan from '../models/insurancePlanModels.js';
import Purchase from '../models/purchaseModels.js';

// Fetch all plans
export const getPlans = async (req, res) => {
  const plans = await InsurancePlan.find();
  res.status(200).json(plans);
};

// Purchase a plan
export const purchasePlan = async (req, res) => {
  const { planId } = req.body;

  try {
    const plan = await InsurancePlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const purchase = await Purchase.create({
      user: req.user.id,
      plan: planId,
    });

    res.status(201).json({
      message: 'Plan purchased successfully',
      purchase,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

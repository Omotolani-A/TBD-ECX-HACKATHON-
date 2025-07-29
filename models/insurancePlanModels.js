import mongoose from 'mongoose';

const insurancePlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coverage: { type: String, required: true },
  premium: { type: Number, required: true },
  duration: { type: String, required: true }, // e.g. 'weekly', 'monthly'
  description: { type: String },
});

const InsurancePlan = mongoose.model('InsurancePlan', insurancePlanSchema);
export default InsurancePlan;

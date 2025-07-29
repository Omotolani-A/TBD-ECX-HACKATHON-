import bcrypt from 'bcrypt';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import Purchase from '../models/purchaseModels.js'; 
import InsurancePlan from '../models/insurancePlanModels.js';
import Claims from '../models/claimModels.js';
// Register user
export const registerUser = async (req, res) => {
  const { name, email, phone, nin, password } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      nin,
      password: hashedPassword,
      role: 'user',
    });

   
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User profile fetched successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields 
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserPlans = async (req, res) => {
  try {
    const plans = await Purchase.find({ user: req.user._id }).populate('plan');
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch plans', error: error.message });
  }
};


// Purchase Insurance Plan
export const purchasePlan = async (req, res) => {
  const { planId } = req.body;

  try {
    // Check if the plan exists
    const plan = await InsurancePlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Insurance plan not found' });
    }

    // Create a new purchase
    const newPurchase = await Purchase.create({
      user: req.user._id,
      plan: planId,
    });

    res.status(201).json({
      message: 'Plan purchased successfully',
      purchase: newPurchase,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to purchase plan', error: error.message });
  }
};


// Submit a Claim
export const submitClaim = async (req, res) => {
  const { purchaseId, description } = req.body;

  try {
    // Check if the purchase exists and belongs to the user
    const purchase = await Purchase.findOne({ _id: purchaseId, user: req.user._id });
    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    const claim = await Claim.create({
      user: req.user._id,
      purchase: purchaseId,
      description,
    });
    res.status(201).json({
      message: 'Claim submitted successfully',
      claim,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit claim', error: error.message });
  }
};

// Get All Claims for User
export const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id }).populate('purchase');
    res.status(200).json(claims);
  } catch (error) {
     res.status(500).json({ message: 'Failed to fetch claims', error: error.message });
  }
};

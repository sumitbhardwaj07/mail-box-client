import mongoose from 'mongoose';

const forgotPasswordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

// Create a model from the schema
export const ForgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);

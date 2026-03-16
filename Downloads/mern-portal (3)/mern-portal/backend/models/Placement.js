const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    location: { type: String, default: '', trim: true },
    salary: { type: String, default: '', trim: true },
    category: { type: String, default: '', trim: true },
    companyType: {
      type: String,
      enum: ['MNC', 'Product', 'Startup'],
      default: 'MNC',
    },
    applyLink: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Placement', placementSchema);

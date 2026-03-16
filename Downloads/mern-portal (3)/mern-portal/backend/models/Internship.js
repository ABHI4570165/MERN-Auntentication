const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    jobTitle:    { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    location:    { type: String, default: '', trim: true },
    stipend:     { type: String, default: '', trim: true },
    duration:    { type: String, default: '', trim: true },
    internshipType: {
      type: String,
      enum: ['Full-Time', 'Part-Time'],
      default: 'Full-Time',
    },
    category: { type: String, default: '', trim: true },
    companyType: {
      type: String,
      enum: ['MNC', 'Product', 'Startup'],
      default: 'MNC',
    },
    description: { type: String, default: '', trim: true },
    skills:      { type: [String], default: [] },
    applyLink:   { type: String, default: '' },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);

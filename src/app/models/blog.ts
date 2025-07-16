import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  intent: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    required: true,
  },
  voice: {
    type: String,
    required: true,
  },
  outline: {
    type: [String], // optional: if outline is in array format
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  seo: {
    optimized_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    final_hashtags: {
      type: [String],
      required: true,
    },
  },
  blog: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false, // for logged-in user (optional)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Prevent model overwrite issues in dev
export const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

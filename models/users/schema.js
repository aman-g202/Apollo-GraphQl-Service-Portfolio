import { Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  work: [String],
  subTitle: String,
  subTitleDescription: String,
  socialMedia: {
    instagram: String,
    twitter: String,
    linkedIn: String,
    stackOverFlow: String,
    github: String,
  },
  profilePhotoPath: String,
  description: String,
  birthday: Date,
  address: {
    location: String,
    area: String,
    landmark: String,
    city: String,
    state: String,
    country: String,
  },
  email: String,
  phone: String,
  education: {
    study: String,
    degree: String,
  },
  interests: [String],
  availability: {
    // type: String,
    // available: Boolean,
  },
  skills: {
    technical: [
      {
        name: String,
        score: String,
      },
    ],
    language: [
      {
        name: String,
        score: String,
      },
    ],
  },
  knowledge: [String],
  educationHistory: [
    {
      startYear: Number,
      endYear: Number,
      title: String,
      subTitle: String,
    },
  ],
  experience: [
    {
      startYear: Number,
      endYear: Number,
      title: String,
      subTitle: String,
    },
  ],
  testimonials: [
    {
      description: String,
      name: String,
      role: String,
      profilePhotoPath: String,
    },
  ],
  facts: {
    projectsCompleted: String,
    happyClients: String,
    professionalStartYear: Number,
  },
});

const User = db.model("users", UserSchema);

export default User;

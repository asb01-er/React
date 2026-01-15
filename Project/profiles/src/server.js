import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  status: String,
  age: Number,
  gender: String,
  nationality: String,

  contact: {
    email: String,
    phone: String,
  },

  physical: {
    height: Number,
    weight: Number,
    bust: Number,
    waist: Number,
    hips: Number,
    hairColor: String,
    eyeColor: String,
    shoeSize: Number,
    clothingSize: String,
  },

  professional: {
    employment: String,
    experience: String,
    agencies: [String],
    categories: [String],
    portfolioLinks: [String],
  },

  skills: {
    hobbies: [String],
    specialSkills: [String],
    languages: [String],
  },

  images: [String],
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/users", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.get("/test-mongo", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ message: "MongoDB connected!", usersCount: count });
  } catch (err) {
    res.status(500).json({ message: "MongoDB connection failed", error: err });
  }
});

app.get("/test-mongo", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ message: "MongoDB connected!", usersCount: count });
  } catch (err) {
    res.status(500).json({ message: "MongoDB connection failed", error: err });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));

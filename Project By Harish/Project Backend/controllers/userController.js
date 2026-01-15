import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwtController from "jsonwebtoken";

import {connectDB} from "../config/db.js";

const collectionName = "users";

export const getUser = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);

  const user = await collection.findOne(
    { _id: new ObjectId(req.decoded.userId) },
    { projection: { password: 0 } }
  );

  if (!user) {
    return res.status(404).send({ success: false });
  }

  res.send({
    success: true,
    massage: "Login successful",
    result: {
      fullName: user.fullName,
      email: user.email
    }
  });
};

export const registerUser = async (req, res) => {
  const db = await connectDB();
  const collection = db.collection(collectionName);

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).send({ success: false, message: "Required all fields" });
  }

  const emailExists = await collection.findOne({ email });
  if (emailExists) {
    return res.status(400).send({ success: false, message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await collection.insertOne({
    fullName,
    email,
    password: hashedPassword
  });

  res.status(201).send({ success: true, result });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const db = await connectDB();
  const collection = db.collection(collectionName);

  const user = await collection.findOne({ email });

  if (!user) {
    return res.status(400).send({ success: false, message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ success: false, message: "Invalid email or password" });
  }

  const tokenData = {
    userId: user._id,
    fullName: user.fullName,
    email: user.email
  };

  jwtController.sign(tokenData, "Google", { expiresIn: "2h" }, (err, token) => {
    if (err) {
      return res.status(500).send({ success: false });
    }

    res.status(200).send({
      success: true,
      token,
      user: {
        fullName: user.fullName,
        email: user.email
      }
    });
  });
};



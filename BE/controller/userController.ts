import { Request, Response } from "express";
import userModel from "../model/userModel";
import { randomBytes } from "crypto";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = randomBytes(3).toString("hex");
    const genSalt = await bcrypt.genSalt(10);

    const hashed: string = await bcrypt.hash(password, genSalt);

    const user = await userModel.create({ email, token, password: hashed });

    return res.status(201).json({
      msg: "User created successfully",
      data: user,
    });
  } catch (error) {
    return error;
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const { ID } = req.params;

    const user = await userModel.findById(ID);

    if (user && user.token === token) {
      await userModel.findByIdAndUpdate(ID, { verified: true }, { new: true });

      return res.status(200).json({
        msg: "User verified successfully",
      });
    } else {
      return res.status(404).json({
        msg: "Token incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const loginUser = async (req: any, res: Response) => {
  try {
    const { token, email } = req.body;

    const user = await userModel.findOne({ email });

    if (user && user.token === token && user.verified) {
      req.session.isAuth = true;
      req.session.isUserID = user._id;

      return res.status(200).json({
        msg: "User logged in successfully",
        data: user,
      });
    } else {
      return res.status(404).json({
        msg: "Token incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const readUserCookie = async (req: any, res: Response) => {
  try {
    const userID = req.session.isUserID;
    console.log("ID", userID);

    return res.status(200).json({
      msg: "User",
      data: userID,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const readUser = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    return res.status(200).json({
      msg: "User",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const updateStarted = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await userModel.findById(userID);

    if (user && user.verified) {
      await userModel.findByIdAndUpdate(
        userID,
        { started: true },
        { new: true }
      );
    }

    return res.status(200).json({
      msg: "User",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const logoutUser = async (req: any, res: Response) => {
  try {
    req.session.destroy();

    return res.status(200).json({
      msg: "User logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const addUserName = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { name } = req.body;

    const user = await userModel.findById(userID);

    if (user && user.verified) {
      await userModel.findByIdAndUpdate(userID, { name }, { new: true });
    }

    return res.status(200).json({
      msg: "User",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

export const addUserPreference = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { preference } = req.body;

    const user = await userModel.findById(userID);

    if (user && user.verified) {
      await userModel.findByIdAndUpdate(userID, { preference }, { new: true });
    }

    return res.status(200).json({
      msg: "User",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      msg: "Error creating user",
    });
  }
};

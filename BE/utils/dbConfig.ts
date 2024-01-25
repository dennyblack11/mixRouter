import { connect } from "mongoose";
import { config } from "dotenv";
config();

const URL: string = process.env.DATABASE_URL!;

export const dbConfig = async () => {
  try {
    return await connect(URL).then(() => {
      console.log("DB connected");
    });
  } catch (error) {
    console.log(error);
  }
};

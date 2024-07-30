import mongoose from "mongoose";
export class Config {
  async start() {
    try {
      await this.dbConnect("mongodb+srv://Tanii:1508@cluster0.wlludic.mongodb.net/flight");
      console.log("mongodb", "mongodb+srv://Tanii:1508@cluster0.wlludic.mongodb.net/flight");
    } catch (error) {
      console.error("OOPS! ", error);
      throw new Error("error");
    }
  }

  private async dbConnect(url: string) {
    try {
      await mongoose.connect(url);
      console.log("Connected to DB");
    } catch (error) {
      console.error("DB Connection Error ", error);
    }
  }
}
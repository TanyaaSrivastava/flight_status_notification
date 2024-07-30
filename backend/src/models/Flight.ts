import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true },
  status: { type: String, required: true }
});

const Flight = mongoose.model("project", flightSchema);
export default Flight;
    
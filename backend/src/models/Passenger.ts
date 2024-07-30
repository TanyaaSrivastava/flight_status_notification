import { Document, Model, model, Schema } from "mongoose";

export interface IPassenger extends Document {
    name: string;
    mobile: string;
    email: string;
    flightNumber: string;
}

const passengerSchema = new Schema<IPassenger>({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    flightNumber: { type: String, required: true }
});

const passengerModel = model("Passenger", passengerSchema);

export default passengerModel;

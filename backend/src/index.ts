import express from "express";
import { Config } from "./config/Config";
import { body, validationResult } from "express-validator";
import Passenger from "./models/Passenger";
import Flight from "./models/Flight";
import { validFlightNumbers } from "./validations/validFlightNumbers";
import { JsonResponse } from "./utils/jsonResponse";
import { SendMail } from "./services/mail.service";
import { SendSMS } from "./services/sms.service";
import cors from "cors";


const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Flight Management Server");
});

const runningMessage = `Server running at http://localhost:${port}`;

new Config()
  .start()
  .then(() => {
    app.listen(port, () => {
      console.log(runningMessage);
    });
  })
  .catch((error: any) => {
    console.log("Config Error ", error);
  });

app.post("/addPassenger", [
  body('name').notEmpty().withMessage('Name is required'),
  body('mobile').notEmpty().withMessage('Mobile is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('flightNumber').custom(value => {
    if (!validFlightNumbers.includes(value)) {
      throw new Error('Invalid flight number');
    }
    return true;
  })
], async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, mobile, email, flightNumber } = req.body;

  try {
    const existingPassenger = await Passenger.findOne({ email, mobile });
    if (existingPassenger) {
      return JsonResponse(res, {
        statusCode: 400,
        status: "error",
        title: "Duplicate Entry",
        message: "A passenger with the same email and mobile number already exists."
      });
    }

    const passenger = new Passenger({ name, mobile, email, flightNumber });
    await passenger.save();

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Added successfully",
      message: "Passenger added successfully."
    });
  } catch (err) {
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: (err as any).message
    });
  }
});

app.put("/updateFlightStatus", [
  body('flightNumber').custom(value => {
    if (!validFlightNumbers.includes(value)) {
      throw new Error('Invalid flight number');
    }
    return true;
  }),
  body('status').notEmpty().withMessage('Status is required')
], async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { flightNumber, status } = req.body;

  try {
    const flight = await Flight.findOne({ flightNumber });
    if (!flight) {
      return JsonResponse(res, {
        statusCode: 404,
        status: "error",
        title: "Not Found",
        message: "Flight number does not exist."
      });
    }

    const oldStatus = flight.status;
    flight.status = status;
    await flight.save();

    const passengers = await Passenger.find({ flightNumber });
    const emailPromises = passengers.map(passenger => {
      const sendEmail = {
        to: passenger.email,
        subject: "Flight Status Update",
        html: `<h3>Flight Status Update</h3><p>Dear ${passenger.name},</p><p>The status of your flight ${flightNumber} has changed from ${oldStatus} to ${status}.</p>`,
      };
      return SendMail(sendEmail);
    });

    const smsPromises = passengers.map(passenger => {
      const sendSMS = {
        to: passenger.mobile,
        body: `Dear ${passenger.name}, your flight ${flightNumber} status has changed from ${oldStatus} to ${status}.`
      };
      return SendSMS(sendSMS);
    });

    await Promise.all([...emailPromises, ...smsPromises]);

    return JsonResponse(res, {
      statusCode: 200,
      status: "success",
      title: "Updated successfully",
      message: "Flight status updated successfully and notifications sent."
    });
  } catch (err) {
    return JsonResponse(res, {
      statusCode: 500,
      status: "error",
      title: "Error",
      message: (err as any).message
    });
  }
});


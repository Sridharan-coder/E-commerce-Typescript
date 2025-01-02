import { Request, Response } from "express";

const express = require('express');

const mongoose = require("mongoose")
const cors = require("cors")
const cryptos = require('crypto');
const { Cashfree } = require('cashfree-pg');

const { errorHandler } = require("./Controllers/e_CommerceController");
import {router as e_commerceRouter} from "./Routes/e_CommerceRoutes";

const path = require("path");

const app = express();

require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log("MongoDB connected"))
    .catch((err:unknown) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Database connected successfully");
});

app.get("/", (_:Request, res:Response) => {
    res.send("Server is working");
});

app.use("/", e_commerceRouter);

app.use("/uploads", express.static(path.join(__dirname,"..","uploads")));

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

function generateOrderId() {
    const uniqueId = cryptos.randomBytes(16).toString('hex');

    const hash = cryptos.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}


app.get('/payment/:amt', async (req:Request, res:Response) => {

    try {
        const amount = Number(req.params["amt"]);
        let request = {
            "order_amount": amount,
            "order_currency": "INR",
            "order_id": generateOrderId(),
            "customer_details": {
                "customer_id": "webcodder01",
                "customer_phone": "9999999999",
                "customer_name": "Web Codder",
                "customer_email": "webcodder@example.com"
            },
        }


        Cashfree.PGCreateOrder("2023-08-01", request).then((response:any) => {
            res.json(response.data);
        }).catch((error:any) => {
            console.error(error.response.data.message);
        })
    } catch (error) {
        console.log(error);
    }
})


app.post('/verify', async (req:Request, res:Response) => {
    try {
        const { orderId } = req.body;

        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response:any) => {
            res.json(response.data);
        }).catch((error:any) => {
            console.error("Error -->", error.response.data.message);
        })
    } catch (error) {
        console.log("Erroe ->>", error);
    }
})














app.use(errorHandler);

app.listen(process.env.PORT || 3321, () => {
    console.log("Server is running on port 3321");
});
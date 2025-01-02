"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const sellerInfo = new Schema({
    s_id: {
        type: Number,
        required: true,
        unique: true
    },
    s_name: {
        type: String,
        required: true,
    },
    s_phoneNumber: {
        type: Number,
        required: true,
    },
    s_emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    s_password: {
        type: String,
        required: true
    }
});
const warehouseInfo = new Schema({
    p_id: {
        type: Number,
        required: true,
        unique: true
    },
    p_name: {
        type: String,
        required: true,
    },
    p_price: {
        type: Number,
        required: true,
    },
    p_image: {
        type: String,
        required: true
    },
    p_type: {
        type: String,
        required: true
    },
    p_stock: {
        type: Number,
        required: true,
    },
    s_ids: [{
            type: Number,
            required: true,
        }]
});
const userDetailsInfo = new Schema({
    u_id: {
        type: Number,
        required: true,
        unique: true
    },
    u_name: {
        type: String,
        required: true,
    },
    u_phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    u_emailAddress: {
        type: String,
        unique: true,
    },
    u_password: {
        type: String,
        required: true
    },
    u_carts: [{
            type: Number
        }],
    u_whitelist: [{
            type: Number
        }]
});
const Warehouse = mongoose_1.default.model("Warehouse", warehouseInfo);
const UserDetails = mongoose_1.default.model("UserDetails", userDetailsInfo);
const Seller = mongoose_1.default.model("Seller", sellerInfo);
module.exports = { Seller, Warehouse, UserDetails };

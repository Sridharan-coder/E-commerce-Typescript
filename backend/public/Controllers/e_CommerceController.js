"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.sellerLogin = exports.getProductByType = exports.getProductById = exports.getUser = exports.getSeller = exports.deleteProduct = exports.deleteUser = exports.deleteSeller = exports.updateProduct = exports.updateUser = exports.updateSeller = exports.addUser = exports.addProducts = exports.addSeller = exports.errorHandler = void 0;
const e_CommerceServices_1 = require("../Services/e_CommerceServices");
const jwt = require('jsonwebtoken');
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
exports.errorHandler = errorHandler;
const addSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerInfo = req.body;
        const s_id = Math.floor(Math.random() * 10000);
        sellerInfo["s_id"] = s_id;
        yield (0, e_CommerceServices_1.createSeller)(sellerInfo);
        res.header("Access-Control-Allow-Origin: *");
        res.status(201).json({
            success: true,
            message: "Seller added successfully!"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addSeller = addSeller;
const addProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hostPath = `${req.protocol}://${req.get("host")}/uploads/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        const productData = req.body;
        productData['p_id'] = Math.floor(Math.random() * 10000);
        yield (0, e_CommerceServices_1.createProduct)(hostPath, req.body);
        res.header("Access-Control-Allow-Origin: *");
        res.status(201).json({
            success: true,
            message: "Product added successfully!",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addProducts = addProducts;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const u_id = Math.floor(Math.random() * 10000);
        userInfo["u_id"] = u_id;
        yield (0, e_CommerceServices_1.createUser)(req.body);
        res.header("Access-Control-Allow-Origin: *");
        res.status(201).json({
            message: "User added successfully!"
        });
    }
    catch (error) {
        next(error);
    }
});
exports.addUser = addUser;
const updateSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        const s_id = Number(req.params["s_id"]);
        yield (0, e_CommerceServices_1.updateSellerDetails)(s_id, inputData);
        res.status(200).json({
            success: true,
            msg: "Seller updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateSeller = updateSeller;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        const u_id = Number(req.params["u_id"]);
        yield (0, e_CommerceServices_1.updateUserDetails)(u_id, inputData);
        res.status(200).json({
            success: true,
            msg: "User updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        const p_id = Number(req.params["p_id"]);
        yield (0, e_CommerceServices_1.updateProductDetails)(p_id, inputData);
        res.status(200).json({
            success: true,
            msg: "Product updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
const deleteSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const s_id = Number(req.params["s_id"]);
        yield (0, e_CommerceServices_1.deleteSellerDetails)(s_id);
        res.status(200).json({
            success: true,
            msg: "Seller removed successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteSeller = deleteSeller;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u_id = Number(req.params["u_id"]);
        yield (0, e_CommerceServices_1.deleteUserDetails)(u_id);
        res.status(200).json({
            success: true,
            msg: "User removed successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p_id = Number(req.params["p_id"]);
        yield (0, e_CommerceServices_1.deleteProductDetails)(p_id);
        res.status(200).json({
            success: true,
            msg: "product removed successfully",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
const getSeller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u_id = Number(req.params["u_id"]);
        const user = yield (0, e_CommerceServices_1.getSellerDetails)(u_id);
        res.status(200).json({
            success: true,
            msg: "User Fetched successfully",
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSeller = getSeller;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u_id = Number(req.params["u_id"]);
        const user = yield (0, e_CommerceServices_1.getUserDetails)(u_id);
        res.status(200).json({
            success: true,
            msg: "User Fetched successfully",
            user
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p_id = Number(req.params["p_id"]);
        const product = yield (0, e_CommerceServices_1.getProductByIdDetails)(p_id);
        res.status(200).json({
            success: true,
            msg: "Product fetched successfully",
            product
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const getProductByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p_type = req.params["p_type"];
        const products = yield (0, e_CommerceServices_1.getProductByTypeDetails)(p_type);
        res.status(200).json({
            success: true,
            msg: "Products fetched successfully",
            products
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductByType = getProductByType;
const sellerLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const s_emailAddress = req.body.s_emailAddress;
        const seller = yield (0, e_CommerceServices_1.getSellerLogin)(s_emailAddress);
        if (seller && seller.s_password === req.body.s_password) {
            res.status(200).json({
                success: true,
                message: "Login successfully",
                seller
            });
        }
        else {
            res.status(404).json({
                success: true,
                message: "UserName or Password was incorrect"
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.sellerLogin = sellerLogin;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u_emailAddress = req.body.u_emailAddress;
        const user = yield (0, e_CommerceServices_1.getUserLogin)(u_emailAddress);
        console.log(new Date().getTime(), "=====", new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getTime());
        if (user && user.u_password === req.body.u_password) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: user.u_id,
                userName: user.u_name,
                userEmail: user.u_emailAddress,
                pwd: user.u_password,
                // exp: new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getTime(),
                // exp:Math.floor(new Date().getTime()/1000)
            };
            const token = jwt.sign(data, jwtSecretKey, { expiresIn: "10h" });
            res.status(200).json({
                success: true,
                message: "Login successfully",
                user,
                token
            });
        }
        else {
            res.status(404).json({
                success: true,
                message: "UserName or Password was incorrect"
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.userLogin = userLogin;
module.exports = {
    errorHandler: exports.errorHandler,
    addProducts: exports.addProducts,
    addSeller: exports.addSeller,
    addUser: exports.addUser,
    updateSeller: exports.updateSeller,
    updateUser: exports.updateUser,
    updateProduct: exports.updateProduct,
    deleteSeller: exports.deleteSeller,
    deleteUser: exports.deleteUser,
    deleteProduct: exports.deleteProduct,
    getSeller: exports.getSeller,
    getUser: exports.getUser,
    getProductById: exports.getProductById,
    getProductByType: exports.getProductByType,
    sellerLogin: exports.sellerLogin,
    userLogin: exports.userLogin
};

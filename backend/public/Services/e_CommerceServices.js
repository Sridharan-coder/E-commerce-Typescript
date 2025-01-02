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
exports.getProductByTypeDetails = exports.getProductByIdDetails = exports.getUserLogin = exports.getUserDetails = exports.getSellerLogin = exports.getSellerDetails = exports.deleteProductDetails = exports.deleteUserDetails = exports.deleteSellerDetails = exports.updateProductDetails = exports.updateUserDetails = exports.updateSellerDetails = exports.createUser = exports.createProduct = exports.createSeller = void 0;
const { Seller, Warehouse, UserDetails } = require("../Models/schema");
const createSeller = (content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Seller.create(content);
});
exports.createSeller = createSeller;
const createProduct = (filePath, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.create(Object.assign(Object.assign({}, content), { p_image: filePath }));
});
exports.createProduct = createProduct;
const createUser = (content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserDetails.create(content);
});
exports.createUser = createUser;
const updateSellerDetails = (s_id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Seller.findOneAndUpdate({ s_id }, content, {
        new: true,
    });
});
exports.updateSellerDetails = updateSellerDetails;
const updateUserDetails = (u_id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserDetails.findOneAndUpdate({ u_id }, content, {
        new: true,
    });
});
exports.updateUserDetails = updateUserDetails;
const updateProductDetails = (p_id, content) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.findOneAndUpdate({ p_id }, content, {
        new: true,
    });
});
exports.updateProductDetails = updateProductDetails;
const deleteSellerDetails = (s_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Seller.findOneAndDelete({ s_id });
});
exports.deleteSellerDetails = deleteSellerDetails;
const deleteUserDetails = (u_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserDetails.findOneAndDelete({ u_id });
});
exports.deleteUserDetails = deleteUserDetails;
const deleteProductDetails = (p_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.findOneAndDelete({ p_id });
});
exports.deleteProductDetails = deleteProductDetails;
const getSellerDetails = (s_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Seller.findOne({ s_id });
});
exports.getSellerDetails = getSellerDetails;
const getSellerLogin = (s_emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Seller.findOne({ s_emailAddress });
});
exports.getSellerLogin = getSellerLogin;
const getUserDetails = (u_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserDetails.findOne({ u_id });
});
exports.getUserDetails = getUserDetails;
const getUserLogin = (u_emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserDetails.findOne({ u_emailAddress });
});
exports.getUserLogin = getUserLogin;
const getProductByIdDetails = (p_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.findOne({ p_id });
});
exports.getProductByIdDetails = getProductByIdDetails;
const getProductByTypeDetails = (p_type) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Warehouse.find({
        p_type: {
            $regex: `.*${p_type}.*`,
            $options: 'i'
        }
    });
});
exports.getProductByTypeDetails = getProductByTypeDetails;
module.exports = {
    createProduct: exports.createProduct,
    createSeller: exports.createSeller,
    createUser: exports.createUser,
    updateSellerDetails: exports.updateSellerDetails,
    updateUserDetails: exports.updateUserDetails,
    updateProductDetails: exports.updateProductDetails,
    deleteSellerDetails: exports.deleteSellerDetails,
    deleteUserDetails: exports.deleteUserDetails,
    deleteProductDetails: exports.deleteProductDetails,
    getSellerDetails: exports.getSellerDetails,
    getUserDetails: exports.getUserDetails,
    getProductByIdDetails: exports.getProductByIdDetails,
    getProductByTypeDetails: exports.getProductByTypeDetails,
    getUserLogin: exports.getUserLogin,
    getSellerLogin: exports.getSellerLogin
};

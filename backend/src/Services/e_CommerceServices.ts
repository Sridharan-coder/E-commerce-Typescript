import { DBInterfaces } from "../fileInterfaces";


const { Seller, Warehouse, UserDetails } = require("../Models/schema")


export const createSeller = async (content:DBInterfaces.SellerInterface) => {
    return await Seller.create(content);
}

export const createProduct = async (filePath:string, content:DBInterfaces.ProductWarehouse) => {
    return await Warehouse.create({ ...content, p_image: filePath })
}

export const createUser = async (content:DBInterfaces.UserInterface) => {
    return await UserDetails.create(content);
}

export const updateSellerDetails = async (s_id:number, content:DBInterfaces.SellerInterface) => {
    return await Seller.findOneAndUpdate({ s_id }, content, {
        new: true,
    });
}

export const updateUserDetails = async (u_id:number, content:DBInterfaces.UserInterface) => {
    return await UserDetails.findOneAndUpdate({ u_id }, content, {
        new: true,
    });
}

export const updateProductDetails = async (p_id:number, content:DBInterfaces.ProductWarehouse) => {
    return await Warehouse.findOneAndUpdate({ p_id }, content, {
        new: true,
    });
}

export const deleteSellerDetails = async (s_id:number) => {
    return await Seller.findOneAndDelete({ s_id });
}

export const deleteUserDetails = async (u_id:number) => {
    return await UserDetails.findOneAndDelete({ u_id });
}

export const deleteProductDetails = async (p_id:number) => {
    return await Warehouse.findOneAndDelete({ p_id });
}

export const getSellerDetails = async (s_id:number) => {
    return await Seller.findOne({ s_id })
}

export const getSellerLogin = async (s_emailAddress:string) => {
    return await Seller.findOne({ s_emailAddress })
}

export const getUserDetails = async (u_id:number) => {
    return await UserDetails.findOne({ u_id })
}

export const getUserLogin = async (u_emailAddress:string) => {
    return await UserDetails.findOne({ u_emailAddress })
}


export const getProductByIdDetails = async (p_id:number) => {
    return await Warehouse.findOne({ p_id })
}

export const getProductByTypeDetails = async (p_type:string) => {
    return await Warehouse.find({
        p_type: {
            $regex: `.*${p_type}.*`,
            $options: 'i'
        }
    })
}

module.exports = {
    createProduct,
    createSeller,
    createUser,
    updateSellerDetails,
    updateUserDetails,
    updateProductDetails,
    deleteSellerDetails,
    deleteUserDetails,
    deleteProductDetails,
    getSellerDetails,
    getUserDetails,
    getProductByIdDetails,
    getProductByTypeDetails,
    getUserLogin,
    getSellerLogin
}
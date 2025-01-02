
import path from "path";
import {
  createProduct,
  createSeller,
  createUser,
  updateSellerDetails,
  updateUserDetails,
  updateProductDetails,
  deleteProductDetails,
  deleteUserDetails,
  deleteSellerDetails,
  getUserDetails,
  getProductByIdDetails,
  getProductByTypeDetails,
  getSellerDetails,
  getUserLogin,
  getSellerLogin
} from "../Services/e_CommerceServices";
import { Request, Response } from "express";
import { CustomError, DBInterfaces } from "../fileInterfaces";
const jwt = require('jsonwebtoken');

export const errorHandler = async (err: CustomError.Error, req: Request, res: Response, next: Function) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};


export const addSeller = async (req: Request, res: Response, next: Function) => {
  try {
    const sellerInfo = req.body;
    const s_id = Math.floor(Math.random() * 10000)
    sellerInfo["s_id"] = s_id;
    await createSeller(sellerInfo);

    res.header("Access-Control-Allow-Origin: *");
    res.status(201).json({
      success: true,
      message: "Seller added successfully!"
    });
  } catch (error) {
    next(error);
  }
}

export const addProducts = async (req: Request | any, res: Response, next: Function) => {
  try {
    const hostPath = `${req.protocol}://${req.get("host")}/uploads/${req?.file?.filename}`
    const productData = req.body
    productData['p_id'] = Math.floor(Math.random() * 10000);

    await createProduct(hostPath, req.body);

    res.header("Access-Control-Allow-Origin: *");
    res.status(201).json({
      success: true,
      message: "Product added successfully!",
    });
  } catch (error) {
    next(error);
  }
}

export const addUser = async (req: Request, res: Response, next: Function) => {
  try {
    const userInfo = req.body;
    const u_id = Math.floor(Math.random() * 10000)
    userInfo["u_id"] = u_id;
    await createUser(req.body);

    res.header("Access-Control-Allow-Origin: *");
    res.status(201).json({
      message: "User added successfully!"
    });
  } catch (error) {
    next(error);
  }

}



export const updateSeller = async (req: Request, res: Response, next: Function) => {
  try {
    const inputData = req.body;
    const s_id = Number(req.params["s_id"]);

    await updateSellerDetails(s_id, inputData);
    res.status(200).json({
      success: true,
      msg: "Seller updated successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const updateUser = async (req: Request, res: Response, next: Function) => {

  try {
    const inputData = req.body;
    const u_id = Number(req.params["u_id"]);

    await updateUserDetails(u_id, inputData);
    res.status(200).json({
      success: true,
      msg: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const updateProduct = async (req: Request, res: Response, next: Function) => {
  try {
    const inputData = req.body;
    const p_id = Number(req.params["p_id"]);

    await updateProductDetails(p_id, inputData);
    res.status(200).json({
      success: true,
      msg: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const deleteSeller = async (req: Request, res: Response, next: Function) => {
  try {
    const s_id = Number(req.params["s_id"]);

    await deleteSellerDetails(s_id);
    res.status(200).json({
      success: true,
      msg: "Seller removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const deleteUser = async (req: Request, res: Response, next: Function) => {
  try {
    const u_id = Number(req.params["u_id"]);

    await deleteUserDetails(u_id);
    res.status(200).json({
      success: true,
      msg: "User removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const deleteProduct = async (req: Request, res: Response, next: Function) => {
  try {
    const p_id = Number(req.params["p_id"]);

    await deleteProductDetails(p_id);
    res.status(200).json({
      success: true,
      msg: "product removed successfully",
    });
  } catch (error) {
    next(error);
  }
}

export const getSeller = async (req: Request, res: Response, next: Function) => {
  try {
    const u_id = Number(req.params["u_id"]);

    const user = await getSellerDetails(u_id);
    res.status(200).json({
      success: true,
      msg: "User Fetched successfully",
      user
    });
  } catch (error) {
    next(error);
  }
}


export const getUser = async (req: Request, res: Response, next: Function) => {
  try {
    const u_id = Number(req.params["u_id"]);

    const user = await getUserDetails(u_id);


    

    res.status(200).json({
      success: true,
      msg: "User Fetched successfully",
      user
    });
  } catch (error) {
    next(error);
  }
}

export const getProductById = async (req: Request, res: Response, next: Function) => {
  try {
    const p_id = Number(req.params["p_id"]);

    const product = await getProductByIdDetails(p_id);
    res.status(200).json({
      success: true,
      msg: "Product fetched successfully",
      product
    });
  } catch (error) {
    next(error);
  }
}

export const getProductByType = async (req: Request, res: Response, next: Function) => {

  try {
    const p_type: string = req.params["p_type"];
    const products: DBInterfaces.ProductWarehouse = await getProductByTypeDetails(p_type);
    res.status(200).json({
      success: true,
      msg: "Products fetched successfully",
      products
    });
  } catch (error) {
    next(error);
  }
}


export const sellerLogin = async (req: Request, res: Response, next: Function) => {
  try {
    const s_emailAddress = req.body.s_emailAddress;
    const seller = await getSellerLogin(s_emailAddress);
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

  } catch (error) {
    next(error);
  }

}

export const userLogin = async (req: Request, res: Response, next: Function) => {
  try {
    const u_emailAddress = req.body.u_emailAddress;
    const user: DBInterfaces.UserInterface = await getUserLogin(u_emailAddress);
    console.log(new Date().getTime(),"=====", new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getTime());
    if (user && user.u_password === req.body.u_password) {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = {
        time: Date(),
        userId: user.u_id,
        userName: user.u_name,
        userEmail:user.u_emailAddress,
        pwd:user.u_password,
        // exp: new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getTime(),
        // exp:Math.floor(new Date().getTime()/1000)

      }

      const token = jwt.sign(data, jwtSecretKey,{ expiresIn: "10h" });

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

  } catch (error) {
    next(error);
  }

}


module.exports = {
  errorHandler,
  addProducts,
  addSeller,
  addUser,
  updateSeller,
  updateUser,
  updateProduct,
  deleteSeller,
  deleteUser,
  deleteProduct,
  getSeller,
  getUser,
  getProductById,
  getProductByType,
  sellerLogin,
  userLogin
}
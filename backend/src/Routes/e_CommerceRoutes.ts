
import express from "express";
import { addProducts, 
    addSeller, 
    addUser, 
    updateSeller, 
    updateUser, 
    updateProduct, 
    deleteSeller, 
    deleteUser, 
    deleteProduct,
    getUser, 
    getProductById, 
    getProductByType, 
    getSeller, 
    sellerLogin, 
    userLogin 
} from "../Controllers/e_CommerceController";

import { SendingTheMail } from "../Controllers/mailSender";
import {upload} from "../utils/upload";
export const router=express.Router()

router.get("/sellerDetails/:s_id",getSeller)
router.get("/getUserDetals/:u_id",getUser)
router.get("/getProductById/:p_id",getProductById)
router.get("/getProductByType/:p_type",getProductByType)

router.post("/createSeller",addSeller)
router.post("/addProduct",upload,addProducts)
router.post("/createUser",addUser);

router.put("/updateSeller/:s_id",updateSeller)
router.put("/updateUser/:u_id",updateUser)
router.put("/updateProduct/:p_id",updateProduct)

router.delete("/deleteSeller/:s_id",deleteSeller)
router.delete("/deleteUser/:u_id",deleteUser)
router.delete("/deleteProduct/:p_id",deleteProduct)

router.post("/sellerLogin",sellerLogin)
router.post("/userLogin",userLogin)


router.post("/sendEmail",SendingTheMail)


module.exports={router};



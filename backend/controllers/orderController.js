import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing order using COD method

const placeOrder = async (req,res) =>{
    try {
        const{userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})


        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//placing order using Stripe method

const placeOrderStripe = async (req,res) =>{
    
}

//placing order using Razor method

const placeOrderRazorpay = async (req,res) =>{
    
}

//All Orders data for Admin panel
const allOrders = async (req,res) =>{
    
    try {

        const Orders = await orderModel.find({})
        res.json({success:true,Orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//User order data for frontend
const userOrders  = async (req,res) =>{
    try {
        
         const{userId} = req.body

         const order = await orderModel.find({userId})
         response.json({success:true,order})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//update order status from admin panel
const updateStutus = async (req,res) =>{
       
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStutus  }
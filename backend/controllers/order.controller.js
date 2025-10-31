import { Order } from "../models/order.model.js";
import { Purchase } from "../models/purchase.model.js";
import {Course} from "../models/course.model.js"

export const orderData = async (req, res) => {
  const order = req.body;
  try {
    const orderInfo = await Order.create(order);

    console.log(orderInfo);

    if (!orderInfo) {
      return res.status(400).json({ error: "Order creation failed" });
    }
    const { userId, courseId } = orderInfo;

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ errors: "Course already purchased" });
    }

    const purchase = await Purchase.create({ userId, courseId });

    res.status(201).json({
      message: "Order and purchase created successfully",
      orderInfo,
      purchase,
    });
  } catch (error) {
    console.log("Error in order: ", error);
    res.status(500).json({ errors: "Error in order creatinon" });
  }
};
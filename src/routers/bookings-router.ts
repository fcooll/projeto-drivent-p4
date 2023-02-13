import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, getBooking } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("", getBooking)
  .post("", bookingRoom);

export { bookingsRouter };

import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { bookingRoom, getBooking, changeBooking } from "@/controllers";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("", getBooking)
  .post("", bookingRoom)
  .put("/:bookingId", changeBooking);

export { bookingsRouter };

import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/bookings-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const booking = await bookingService.getBooking(Number(userId));
    return res.status(httpStatus.OK).send({ id: booking.id, Room: booking.Room, });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function bookingRoom(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;

    if(!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const booking = await bookingService.bookingRoomById(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;
    const bookingId = Number(req.params.bookingId);

    if(!roomId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    if(!bookingId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const booking = await bookingService.changeBookingRoomById(userId, Number(roomId));

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if(error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

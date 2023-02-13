import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { forbiddenError, notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import roomRepository from "@/repositories/room-repository";

async function validEnrollmentTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) {
    throw forbiddenError();
  }

  const ticket = await  ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if(!ticket || ticket.status === "RESERVED" || 
  ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
}

async function validBooking(roomId: number) {
  const room = await roomRepository.getRoomById(roomId);
  const bookings = await bookingRepository.findByRoomId(roomId);

  if(room.capacity <= bookings.length) {
    throw forbiddenError();
  }
}

async function getBooking(userId: number) {  
  const booking = await bookingRepository.findByUserId(userId);
  if(!booking) {
    throw notFoundError();
  }

  return booking;
}

async function bookingRoomById(userId: number, roomId: number) {
  await validEnrollmentTicket(userId);

  await validBooking(roomId);

  return bookingRepository.create({ roomId, userId });
}

async function changeBookingRoomById(userId: number, roomId: number) {
  await validEnrollmentTicket(userId);

  await validBooking(roomId);

  return bookingRepository.create({ roomId, userId });
}

const bookingService = {
  getBooking,
  bookingRoomById,
  changeBookingRoomById
};

export default bookingService;

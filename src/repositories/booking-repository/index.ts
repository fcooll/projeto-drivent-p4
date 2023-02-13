import { prisma } from "@/config";
import { Booking } from "@prisma/client";

type CreateBookingParams = Omit<Booking, "id" | "createdAt" | "updatedAt">;

async function create({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId,
    },
    include: {
      Room: true
    }
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true
    }
  });
}

const bookingRepository = {
  create,
  findByUserId,
  findByRoomId,
};

export default bookingRepository;
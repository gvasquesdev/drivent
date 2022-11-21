import { prisma } from "@/config";

async function listTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function getTickets(userId: number) {
  const enrollment =  await prisma.enrollment.findFirst({ 
    where: {
      userId: userId
    }
  });
  
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollment.id
    },
    include: {
      TicketType: true
    }
      
  });
}

const ticketsRepository = { getTickets, listTicketsTypes };

export default ticketsRepository;

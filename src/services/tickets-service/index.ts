import { notFoundError } from "@/errors";
import  enrollmentRepository  from "@/repositories/enrollment-repository";
import  ticketsRepository  from "@/repositories/tickets-repository";

async function listTicketsTypes() {
  const types = await ticketsRepository.listTicketsTypes();

  if(!types) {
    const empty: [] = [];
    return empty;
  }

  return types;
}

async function listTicketsData(userId: number) {
  const getUserByEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!getUserByEnrollment)  throw notFoundError();
  
  const ticketData = await ticketsRepository.getTickets(getUserByEnrollment.id);
  if(!ticketData) throw notFoundError();
  
  return ticketData;
}

const ticketsService = { listTicketsData, listTicketsTypes };

export default ticketsService;


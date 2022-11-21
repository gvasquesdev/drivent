import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listAllTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.listTicketsTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send([]);
  }
}

export async function showAllTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  try {
    const ticket = ticketsService.listTicketsData(userId);
    const enrollmentExists = await enrollmentsService.getOneWithAddressByUserId(userId);

    if(enrollmentExists.id !== ) {
      return res.status(httpStatus.NOT_FOUND);
    }

    if(!ticket) {
      return res.status(httpStatus.NOT_FOUND);
    }
   
    return res.status(httpStatus.OK).send({ ticket });
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND);
    }
  }
}


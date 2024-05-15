import { Request, Response } from "express";
import HttpError from "../helpers/HttpError";
import ctrlWrapper from "../decorators/ctrlWrapper";
import Event from "../models/Event";
import Participant, { IParticipantDatabaseResponse } from "../models/Participant";

const getAll = async (req: Request, res: Response): Promise<void> => {
  const { page, pageSize } = req.query;

  // pagination parameters
  const currentPage: number = page ? parseInt(page.toString(), 10) : 1;
  const itemsPerPage: number = pageSize ? parseInt(pageSize.toString(), 10) : 6;

  try {
    const totalEventsCount = await Event.countDocuments({});

    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const result = await Event.find({}, "-createdAt -updatedAt").skip(startIndex).limit(itemsPerPage);

    res.status(200).json({ data: result, totalEvents: totalEventsCount });
  } catch (error: any) {
    throw HttpError(500, "Internal server/database error");
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { event, email } = req.body;

  const eventInfo = await Event.findById(event);
  if (!eventInfo) {
    throw HttpError(404, "Event not found");
  }

  const participant = await Participant.findOne({ event, email });
  if (participant) {
    throw HttpError(409, "Participant already registered for this event");
  }

  try {
    const newParticipant = await Participant.create({ ...req.body });
    if (!newParticipant) {
      throw HttpError(404, "Failed to create participant");
    }

    const typedNewParticipant = newParticipant as unknown as IParticipantDatabaseResponse;

    res.status(201).json({
      event: typedNewParticipant.event,
      name: typedNewParticipant.name,
      email: typedNewParticipant.email
    });
  } catch (error) {
    throw HttpError(500, "Internal server/database error");
  }
};

const participants = async (req: Request, res: Response): Promise<void> => {
  const { event } = req.body;

  const eventInfo = await Event.findById(event);

  if (!eventInfo) {
    throw HttpError(404, "Event not found");
  }

  try {
    const participants = await Participant.find({ event });

    res.status(200).json({ participants });
  } catch (error) {
    throw HttpError(500, "Internal server/database error");
  }
};

export default {
  getAll: ctrlWrapper(getAll),
  register: ctrlWrapper(register),
  participants: ctrlWrapper(participants)
};

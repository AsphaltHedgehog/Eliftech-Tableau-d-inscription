import { Request, Response } from "express";
import HttpError from "../helpers/HttpError";
import ctrlWrapper from "../decorators/ctrlWrapper";
import Event from "../models/Event";

const getAll = async (req: Request, res: Response): Promise<void> => {
  const { page, pageSize } = req.query;

  // pagination parameters
  const currentPage: number = page ? parseInt(page.toString(), 10) : 1;
  const itemsPerPage: number = pageSize ? parseInt(pageSize.toString(), 10) : 6;

  try {
    const totalEventsCount = await Event.countDocuments({});

    const startIndex: number = (currentPage - 1) * itemsPerPage;
    const result = await Event.find({}, "-createdAt -updatedAt").skip(startIndex).limit(itemsPerPage);

    res.status(200).json({ result, totalEventsL: totalEventsCount });
  } catch (error: any) {
    throw HttpError(400, "Internal server/database error");
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  res.status(201).json({});
};

const participants = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({});
};

export default {
  getAll: ctrlWrapper(getAll),
  register: ctrlWrapper(register),
  participants: ctrlWrapper(participants)
};

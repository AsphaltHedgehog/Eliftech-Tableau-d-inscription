import express from "express";
import events from "../controllers/events";

const eventRouter = express.Router();

eventRouter.get("/", events.getAll);

eventRouter.get("/registration", events.register);

eventRouter.get("/participants", events.participants);

export default eventRouter;

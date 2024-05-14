import mongoose, { Document, Schema } from "mongoose";

interface Event {
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
}

const eventSchema = new Schema<Event & Document>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: String, required: true },
    organizer: { type: String, required: true }
  },
  { timestamps: true, versionKey: false }
);

const Event = mongoose.model<Event & Document>("events", eventSchema);

export default Event;

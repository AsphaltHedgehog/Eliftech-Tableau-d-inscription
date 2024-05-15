import mongoose, { Document, Schema } from "mongoose";

export interface IParticipant extends Document {
  event: Schema.Types.ObjectId;
  name: string;
  email: string;
  dateOfBirth: string;
  heardAbout: "social-media" | "friends" | "myself";
}

export interface IParticipantDatabaseResponse extends Document {
  _id: Schema.Types.ObjectId;
  event: Schema.Types.ObjectId;
  name: string;
  email: string;
  dateOfBirth: string;
  heardAbout: "social-media" | "friends" | "myself";
  createdAt: Schema.Types.Date;
  updatedAt: Schema.Types.Date;
}

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})|(\[IPv6:[^\]]+\]))$/i;

const participantSchema = new Schema<IParticipant & Document>(
  {
    event: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true, minlength: 1, maxlength: 32 },
    email: {
      type: String,
      required: true,
      match: emailRegex,
      minlength: 8,
      maxlength: 64
    },
    dateOfBirth: { type: String, required: true },
    heardAbout: {
      type: String,
      required: true,
      enum: ["social-media", "friends", "myself"]
    }
  },
  { timestamps: true, versionKey: false }
);

const Participant = mongoose.model<Event & Document>("participants", participantSchema);

export default Participant;

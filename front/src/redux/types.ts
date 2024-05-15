export interface IGetEventsResponse<T> {
  data: T[] | [];
  totalEvents: number;
}

export interface IEvents {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
}

export interface IParticipant {
  _id: string;
  event: string;
  name: string;
  email: string;
  dateOfBirth: string;
  heardAbout: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetParticipantsResponse<T> {
  participants: T[] | [];
}

export interface ISetParticipantResponse {
  event: string;
  name: string;
  email: string;
}

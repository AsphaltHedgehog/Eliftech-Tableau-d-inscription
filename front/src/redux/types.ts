export interface IGetEventsResponse<T> {
  data: T[];
  totalEvents: number;
}

export interface IEvents {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  organizer: string;
}

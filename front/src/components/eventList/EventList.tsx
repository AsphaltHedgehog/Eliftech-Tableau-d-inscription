import { IEvents } from "@/redux/types";
import { NavLink } from "react-router-dom";

interface EventListProps {
  data: IEvents[];
}

const EventList = ({ data }: EventListProps) => {
  const eventList = data.map((event) => {
    const { _id, title, description, eventDate, organizer } = event;

    return (
      <div key={_id} className="rounded bg-gray-100 p-4">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <div className="mb-2 flex justify-between">
          <p>{eventDate}</p>
          <p>{organizer}</p>
        </div>
        <p className="mb-2">{description}</p>
        <div className="flex justify-between">
          <NavLink to={`registration/${_id}`} className="text-blue-600 hover:underline">
            Register
          </NavLink>
          <NavLink to={`participants/${_id}`} className="text-blue-600 hover:underline">
            View
          </NavLink>
        </div>
      </div>
    );
  });

  return eventList;
};

export default EventList;

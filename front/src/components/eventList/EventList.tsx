import { IEvents } from "@/redux/types";
import { NavLink } from "react-router-dom";

interface EventListProps {
  data: IEvents[];
}

const EventList = ({ data }: EventListProps) => {
  const eventList = data.map((event) => {
    const { _id, title, description, eventDate, organizer } = event;

    return (
      <li key={_id}>
        <div>
          <h3>{title}</h3>
          <div>
            <p>{eventDate}</p>
            <p>{organizer}</p>
          </div>
        </div>
        <p>{description}</p>
        <div>
          <NavLink to={`registration/${_id}`}>Register</NavLink>
          <NavLink to={`participants/${_id}`}>View</NavLink>
        </div>
      </li>
    );
  });

  return eventList;
};

export default EventList;

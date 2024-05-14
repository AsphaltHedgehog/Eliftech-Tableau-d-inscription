import EventList from "@/components/eventList/EventList";
import { useGetEventsQuery } from "@/redux/eventsApi/operations";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data: events } = useGetEventsQuery({ page });

  return (
    <>
      <div>Events</div>
      {events && events.data.length >= 1 && (
        <InfiniteScroll
          dataLength={events.data.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={events.totalEvents / 6 > page ? true : false}
          loader={<h4>Loading...</h4>}
          endMessage={<p>Yay! You have seen all available Events.</p>}
        >
          <EventList data={events.data} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default HomePage;

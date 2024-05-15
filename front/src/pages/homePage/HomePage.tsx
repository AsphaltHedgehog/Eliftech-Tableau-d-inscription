import EventList from "@/components/eventList/EventList";
import { useGetEventsQuery } from "@/redux/eventsApi/operations";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data: events, isLoading } = useGetEventsQuery({ page });

  return (
    <main className="container mx-auto px-4">
      <h2 className="mb-4 text-3xl font-semibold">Events</h2>
      {isLoading ? <p>Loading...</p> : <></>}
      {events && events.data.length >= 1 && (
        <InfiniteScroll
          dataLength={events.data.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={events.totalEvents / 10 > page ? true : false}
          loader={<h4 className="mb-4 text-3xl font-semibold">Loading...</h4>}
          endMessage={<p className="mb-4 text-3xl font-semibold">Yay! You have seen all available Events.</p>}
        >
          <section className="mb-5 grid grid-cols-2 gap-4">
            <EventList data={events.data} />
          </section>
        </InfiniteScroll>
      )}
    </main>
  );
};

export default HomePage;

import EventList from "@/components/eventList/EventList";
import { useGetEventsQuery } from "@/redux/eventsApi/operations";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { data: events, isLoading } = useGetEventsQuery({ page });
  const [sortType, setSortType] = useState("");

  const sortEvents = (type: string) => {
    if (events === undefined || events.data === undefined) {
      return [];
    }

    const sortedEvents = [...events.data];

    switch (type) {
      case "title":
        sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "eventDate":
        sortedEvents.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
        break;
      case "organizer":
        sortedEvents.sort((a, b) => a.organizer.localeCompare(b.organizer));
        break;
      default:
        return sortedEvents;
    }

    return sortedEvents;
  };

  const handleSortChange = (type: string) => {
    setSortType(type);
  };

  const handleClearSort = () => {
    setSortType("");
  };

  return (
    <main className="container mx-auto px-4">
      <h2 className="mb-4 text-3xl font-semibold">Events</h2>
      <form className="mb-5 flex h-10 justify-between">
        <div className=" flex space-x-4 rounded bg-gray-100 p-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="title"
              checked={sortType === "title"}
              onChange={() => handleSortChange("title")}
              className="mr-2 cursor-pointer"
            />
            Sort by Title
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="eventDate"
              checked={sortType === "eventDate"}
              onChange={() => handleSortChange("eventDate")}
              className="mr-2 cursor-pointer"
            />
            Sort by Event Date
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="organizer"
              checked={sortType === "organizer"}
              onChange={() => handleSortChange("organizer")}
              className="mr-2 cursor-pointer"
            />
            Sort by Organizer
          </label>
        </div>
        <button 
          // onClick={handleClearSort} 
          className="cursor-pointer rounded bg-blue-400 px-4 py-2 hover:bg-blue-700" type="reset"
        >
          Clear Sort
        </button>
      </form>
      {isLoading ? <p>Loading...</p> : <></>}
      {events && events.data.length >= 1 && (
        <InfiniteScroll
          dataLength={events.data.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={events.totalEvents / 10 > page ? true : false}
          loader={<h4 className="mb-4 text-3xl font-semibold">Loading...</h4>}
          endMessage={<p className="mb-4 text-3xl font-semibold">Yay! You have seen all available Events.</p>}
        >
         <section className="md-5">
            <ul className="grid grid-cols-2 gap-4">
              <EventList data={sortType === "" ? events.data : sortEvents(sortType)} />
            </ul>
         </section>
        </InfiniteScroll>
      )}
    </main>
  );
};

export default HomePage;

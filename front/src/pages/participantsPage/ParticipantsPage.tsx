import { useGetParticipantsQuery } from "@/redux/eventsApi/operations";
import { useState } from "react";
import { useParams } from "react-router";

const ParticipantsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: participants, isLoading } = useGetParticipantsQuery(id ? id : "");

  const filteredParticipants = participants?.participants.filter((participant) => {
    const nameMatch = participant.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const emailMatch = participant.email.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return nameMatch || emailMatch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <main className="container mx-auto px-4">
      <h2 className="mb-4 text-3xl font-semibold">Participants</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-md border border-gray-300 px-4 py-2 focus:border-blue-400 focus:outline-none"
        />
      </div>
      {isLoading ? <p>Loading...</p> : null}
      {filteredParticipants && filteredParticipants.length > 0 && (
        <ul className="grid grid-cols-2 gap-4">
          {filteredParticipants.map((participant) => (
            <li key={participant._id} className="rounded bg-gray-100 p-4">
              <h3 className="mb-2 text-xl font-semibold">{participant.name}</h3>
              <p className="mb-2">{participant.email}</p>
            </li>
          ))}
        </ul>
      )}
      {!filteredParticipants ||
        (filteredParticipants.length === 0 && !isLoading && (
          <p className="mb-2 text-xl font-semibold">No participants found.</p>
        ))}
    </main>
  );
};

export default ParticipantsPage;

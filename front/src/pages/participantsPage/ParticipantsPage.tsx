import { useGetParticipantsQuery } from "@/redux/eventsApi/operations";
import { useParams } from "react-router";

const ParticipantsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: participants, isLoading } = useGetParticipantsQuery(id ? id : "");

  return (
    <main className="container mx-auto px-4">
      <h2 className="mb-4 text-3xl font-semibold">Participants</h2>
      {isLoading ? <p>Loading...</p> : null}
      {participants && participants.participants.length > 0 && (
        <ul className="grid grid-cols-2 gap-4">
          {participants.participants.map((participant) => (
            <li key={participant._id} className="rounded bg-gray-100 p-4">
              <h3 className="mb-2 text-xl font-semibold">{participant.name}</h3>
              <p className="mb-2">{participant.email}</p>
            </li>
          ))}
        </ul>
      )}
      {participants && participants.participants.length === 0 && !isLoading && (
        <p className="mb-2 text-xl font-semibold">No participants found.</p>
      )}
    </main>
  );
};

export default ParticipantsPage;

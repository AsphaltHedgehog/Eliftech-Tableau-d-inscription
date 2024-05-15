import { useGetParticipantsQuery } from "@/redux/eventsApi/operations";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const
    },
    title: {
      display: true,
      text: "Chart.js Line Chart"
    }
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1
      }
    }
  }
};

const ParticipantsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: participants, isLoading } = useGetParticipantsQuery(id ? id : "");
  const [registrationData, setRegistrationData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    if (!participants || !participants.participants.length) return;

    const registrationMap = participants.participants.reduce(
      (acc, participant) => {
        const date = participant.createdAt.split("T")[0];
        acc[date] = acc[date] ? acc[date] + 1 : 1;
        return acc;
      },
      {} as { [date: string]: number }
    );

    const registrationData = Object.entries(registrationMap).map(([date, count]) => ({ date, count }));
    setRegistrationData(registrationData);
  }, [participants]);

  const filteredParticipants = participants?.participants.filter((participant) => {
    const nameMatch = participant.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
    const emailMatch = participant.email.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return nameMatch || emailMatch;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const chartData = {
    labels: registrationData.map(({ date }) => date),
    datasets: [
      {
        label: "Registrations per day",
        data: registrationData.map(({ count }) => count),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  return (
    <main className="container mx-auto px-4">
      <h2 className="mb-4 text-3xl font-semibold">Participants</h2>
      {registrationData.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-2xl font-semibold">Registrations per Day</h3>
          <Bar data={chartData} options={options} />
        </div>
      )}
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

import { Route, Routes } from "react-router";

// components
import Layout from "@/components/layout/Layout";

// pages
import HomePage from "./pages/homePage/HomePage";
import RegistrationPage from "./pages/registrationPage/RegistrationPage";
import ParticipantsPage from "./pages/participantsPage/ParticipantsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="registration/:id" element={<RegistrationPage />} />
          <Route path="participants/:id" element={<ParticipantsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

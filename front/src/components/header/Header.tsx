import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <header className="mr mb-5 flex items-center justify-center bg-gray-800 px-8 py-4 text-white">
      <h1 className="cursor-pointer text-xl font-bold" onClick={handleGoHome}>
        EventFinder
      </h1>
    </header>
  );
};

export default Header;

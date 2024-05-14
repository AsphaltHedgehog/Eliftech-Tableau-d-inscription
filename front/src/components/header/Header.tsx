import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <header>
      <p onClick={handleGoHome}>EventFinder</p>
    </header>
  );
};

export default Header;

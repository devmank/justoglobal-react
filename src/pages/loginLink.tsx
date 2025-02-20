import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const validateLink = async () => {
      if (localStorage.getItem("token")) {
        navigate("/dashboard");
        return;
      }

      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get("redirectUrl");

      if (!redirectUrl) {
        setError("Invalid login link.");
        return;
      }

      try {
        const response = await fetch(redirectUrl);
        const data = await response.json();

        if (isMounted) {
          if (response.ok && data.accessToken) {
            localStorage.setItem("token", data.accessToken);
            navigate("/dashboard");
          } else {
            setError(data.message || "Login link is invalid or expired.");
            setTimeout(() => navigate("/login"), 3000);
          }
        }
      } catch (error) {
        if (isMounted) {
          setError("An error occurred while validating the login link.");
          setTimeout(() => navigate("/login"), 3000);
        }
      }
    };

    validateLink();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>Validating login link...</p>
      )}
    </div>
  );
};

export default LoginLink;

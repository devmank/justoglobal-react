import { dashboardApi } from "../api/dashboard";
import { formatServerTime } from "../utils/dateTimeFormatter";
import { useState } from "react";

const Dashboard = () => {
  const [serverTime, setServerTime] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const handleGetTime = async () => {
    setError(""); // Reset error
    const result = await dashboardApi();

    if (result.data) {
      setServerTime(formatServerTime(result.data.serverTime));
      setUser(result.data.user?.username);
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user && <p>Hello: {user}</p>}
      <button onClick={handleGetTime}>Get Time</button>
      {serverTime && <p>Server Time: {serverTime}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Dashboard;

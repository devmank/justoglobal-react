import { useEffect, useState } from "react";

import { blockUsersApi } from "../api/blockUserApi";
import { dashboardApi } from "../api/dashboard";
import { formatServerTime } from "../utils/dateTimeFormatter";
import { getUsersApi } from "../api/getUsers";

type User = {
  _id: string;
  username: string;
  name: string;
  role: string;
};

const Dashboard = () => {
  const [serverTime, setServerTime] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleGetTime = async () => {
    setError("");
    const result = await dashboardApi();

    if (result.data) {
      setServerTime(formatServerTime(result.data.serverTime));
      setUser(result.data.user?.username);
    } else {
      setError(result.message);
    }
  };

  const fetchUsers = async () => {
    const result = await getUsersApi();
    if (result.data) {
      setUsers(result.data.users);
    } else {
      setError(result.message);
    }
  };

  const handleUserSelect = (username: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter((id) => id !== username)
        : [...prevSelected, username]
    );
  };

  const handleBlockUsers = async () => {
    if (selectedUsers.length === 0) {
      setError("Please select at least one user.");
      return;
    }

    const result = await blockUsersApi(selectedUsers);

    if (result.success) {
      alert("Selected users have been blocked.");
      fetchUsers();
    } else {
      setError(result.data?.message || result.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleGetTime}
        style={{ marginBottom: "10px", padding: "8px" }}
      >
        Get Time
      </button>
      <h2>Dashboard</h2>
      {user && <p>Hello: {user}</p>}
      {serverTime && <p>Server Time: {serverTime}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>User List</h3>
      <table border={1} cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Select</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.username)}
                  onChange={() => handleUserSelect(user.username)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.role ?? "-"} </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUsers.length > 0 && (
        <button
          onClick={handleBlockUsers}
          style={{
            marginTop: "10px",
            padding: "8px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Block Selected Users
        </button>
      )}
    </div>
  );
};

export default Dashboard;

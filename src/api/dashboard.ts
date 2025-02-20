export const dashboardApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/common/getTime`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, // Pass token in the headers
      },
    });

    const data = await response.json();
    if (response.ok) {
      return { data };
    } else {
      return { message: data.message || "Failed to GET time" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { message: "An error occurred while getting the server time." };
  }
};

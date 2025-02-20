export const blockUsersApi = async (usernames: string[]) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/admin/kickOutUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ usernames }),
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.debug(error);

    return {
      success: false,
      message: "An error occurred while blocking users.",
    };
  }
};

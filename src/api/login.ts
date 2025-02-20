const API_BASE_URL = import.meta.env.END_POINT;

export const login = async (username: string, password: string) => {
  try {
    console.log("Base Url:", API_BASE_URL);
    const ipAddress = "127.0.1.1";
    const response = await fetch(`http://localhost:8080/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, ipAddress }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Login failed");
    }

    return responseData;
  } catch (error) {
    console.error("Error during login:", error);
    return {
      error: (error as Error).message || "An unexpected error occurred",
    };
  }
};

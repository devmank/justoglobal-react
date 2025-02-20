export const handleSendLoginLink = async (
  username: string,
  setMessage: (message: string) => void
) => {
  try {
    setMessage("");

    const response = await fetch(`http://localhost:8080/auth/generate-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrPhone: username }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Login link sent! Check your email.");
      return { link: data.link };
    } else {
      setMessage(data.message || "Failed to send login link");
      return { message: data.message || "Failed to send login link" };
    }
  } catch (error) {
    setMessage("An error occurred while sending the login link.");
    console.error("Error:", error);
    return { message: "An error occurred while sending the login link." };
  }
};

export const formatServerTime = (serverTime: string): string => {
  return new Date(serverTime).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", // Convert to IST
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

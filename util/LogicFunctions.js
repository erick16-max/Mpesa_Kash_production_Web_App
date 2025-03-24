export const usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });



  // Helper function to truncate strings
export const truncateString = (str, maxLength) => {
    return str?.length > maxLength ? str?.slice(0, maxLength) + '...' : str;
   };

  
// turn firebase object human readable
export const readableTime = (timeObj) => {
  if (!timeObj) return '';
  const date = new Date(timeObj.seconds * 1000 + timeObj.nanoseconds / 1000000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

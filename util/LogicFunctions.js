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
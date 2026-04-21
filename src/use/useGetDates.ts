export function useGetDates() {

 const getDateToday = () => {
   const today = new Date();
   return today.toISOString().split('T')[0];
  };
  
  const getDateYearAgo = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 1);
    return today.toISOString().split('T')[0];
  }
   
  return {
    getDateToday,
    getDateYearAgo
  }
}
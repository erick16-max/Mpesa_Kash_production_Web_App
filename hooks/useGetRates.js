
export const useGetRates = async () => {
    const response = await fetch("https://api.fastforex.io/fetch-all?api_key=f3094826fc-81a912370b-skfjc2")
    if(response.status === 200){

        const data = await response.json()
        const KES_RATE = data?.results?.KES
        const number_float = KES_RATE.toFixed(2)
        return parseFloat(number_float)
    }else{
        return null
    }
    
  } 
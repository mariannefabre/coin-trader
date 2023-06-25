import { TickerPrice, Ticker24hChange} from "./types";



export const fetchTickerPrice = async (
  endpoint: string,
  symbol: { name: string; value: string }
): Promise<TickerPrice | undefined> => {
  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.append(symbol.name, symbol.value);

  try {
    const response = await fetch(requestUrl);

    if (response.ok) {
      const jsonResponse = await response.json();
      return { price: jsonResponse.price } as TickerPrice;
    }
  } catch (error) {
    console.log("Data not available for this symbol");
  }
};

export const fetchTicker24hChange = async (
  endpoint: string,
  symbol: { name: string; value: string }
): Promise<Ticker24hChange | undefined> => {
  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.append(symbol.name, symbol.value);

  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const jsonResponse = await response.json();
      return {
        priceChange: jsonResponse.priceChange,
        priceChangePercent: jsonResponse.priceChangePercent,
      } as Ticker24hChange;
    }
  } catch (error) {
    console.log(error);
  }
};

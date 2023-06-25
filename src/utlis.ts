import { TickerPrice, Ticker24hChange, Trade} from "./types";


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

export const fetchRecentTrades = async (endpoint: string, symbol: { name: string; value: string } ): Promise<Trade[] | undefined> => {
  const requestUrl = new URL(endpoint);
  requestUrl.searchParams.append(symbol.name, symbol.value);
  requestUrl.searchParams.append("limit", "25");

  try {
    const recentTrades = new Array<Trade>();
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json() as Trade[];
      data.forEach((trade: Trade)=> {
        recentTrades.push({
        id: trade.id,
        price: trade.price,
        qty: trade.qty,
        time: trade.time
      })
    });
    return recentTrades;
  }
  } catch (error) {
    console.log(error);
  }

}
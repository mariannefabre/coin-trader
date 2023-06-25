import { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import { AssetPair, Ticker24hChange, TickerPrice, Trade } from "./types";
import { Form } from "./Form";
import { Outputs } from "./Outputs";
import {
  fetchRecentTrades,
  fetchTicker24hChange,
  fetchTickerPrice,
} from "./utlis";

function App() {
  const [allAssetsPairs, setAllAssetsPairs] = useState<AssetPair[]>();
  const [tickerPrice, setTickerPrice] = useState<TickerPrice>();
  const [ticker24hChange, setTicker24hChange] = useState<Ticker24hChange>();
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [recentTrades, setRecentTrades] = useState<Trade[]>();

  const baseUrl = "https://api3.binance.com";
  const exchangeInfoEndpoint = baseUrl + "/sapi/v1/convert/exchangeInfo";
  const tickerEndpoint = baseUrl + "/api/v3/ticker/price";
  const ticker24hEndpoint = baseUrl + "/api/v3/ticker/24hr";
  const recentTradesEndpoint = baseUrl + "/api/v3/trades";

  const fetchAllAssetPairs = async () => {
    fetch(exchangeInfoEndpoint)
      .then((response) => response.json())
      .then(setAllAssetsPairs)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAllAssetPairs();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const symbol = event.target.symbol;

    const [tickerPrice, ticker24hChange, recentTrades] = await Promise.all([
      fetchTickerPrice(tickerEndpoint, symbol),
      fetchTicker24hChange(ticker24hEndpoint, symbol),
      fetchRecentTrades(recentTradesEndpoint, symbol),
    ]);

    setIsDataAvailable(Boolean(tickerPrice || ticker24hChange));
    setTickerPrice(tickerPrice);
    setTicker24hChange(ticker24hChange);
    setRecentTrades(recentTrades);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Coin Trader</h1>
      </header>
      <section>
        <Form allAssetsPairs={allAssetsPairs} onSubmit={handleSubmit} />
      </section>
      <section>
        <Outputs
          tickerPrice={tickerPrice}
          ticker24hChange={ticker24hChange}
          recentTrades={recentTrades}
        />
        {!isDataAvailable && <div>Data not available</div>}
      </section>
    </div>
  );
}

export default App;

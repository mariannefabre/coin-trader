import { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import {
  AssetPair,
  ExchangeInfoResponse,
  Ticker24hChange,
  TickerPrice,
} from "./types";
import { Form } from "./Form";
import { Outputs } from "./Outputs";
import { fetchTicker24hChange, fetchTickerPrice } from "./utlis";

function App() {
  const [allPairs, setAllPairs] = useState<AssetPair[]>();
  const [selectedPair, setSelectedPair] = useState<string>();
  const [tickerPrice, setTickerPrice] = useState<TickerPrice>();
  const [ticker24hChange, setTicker24hChange] = useState<Ticker24hChange>();
  const [isDataAvailable, setIsDataAvailable] = useState(true);

  const baseUrl = "https://api1.binance.com";
  const exchangeInfoEndpoint = baseUrl + "/sapi/v1/convert/exchangeInfo";
  const tickerEndpoint = baseUrl + "/api/v3/ticker/price";
  const ticker24hEndpoint = baseUrl + "/api/v3/ticker/24hr";

  useEffect(() => {
    const assetPairs = new Array<AssetPair>();
    fetch(exchangeInfoEndpoint)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((exchange: ExchangeInfoResponse) => {
          assetPairs.push({
            fromAsset: exchange.fromAsset,
            toAsset: exchange.toAsset,
          } as AssetPair);
        });
        setAllPairs(assetPairs);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const symbol = event.target.symbol;

    const [tickerPrice, ticker24hChange] = await Promise.all([
      fetchTickerPrice(tickerEndpoint, symbol),
      fetchTicker24hChange(ticker24hEndpoint, symbol),
    ]);

    if (!tickerPrice && !ticker24hChange) {
      setIsDataAvailable(false);
    } else {
      setIsDataAvailable(true);
    }

    setSelectedPair(symbol.value);
    setTickerPrice(tickerPrice);
    setTicker24hChange(ticker24hChange);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Coin Trader</h1>
      </header>
      <section>
        <Form assetPairs={allPairs} onSubmit={handleSubmit} />
      </section>
      <section>
        <Outputs
          selectedPair={selectedPair}
          tickerPrice={tickerPrice}
          ticker24hChange={ticker24hChange}
        />
        {!isDataAvailable && <div>Data not available</div>}
      </section>
    </div>
  );
}

export default App;

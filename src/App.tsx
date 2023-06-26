import { useEffect, useState } from "react";
import styled from "styled-components";

import { Form } from "./Form";
import logo from "./logo.png";
import { Outputs } from "./Outputs";
import { AssetPair, Ticker24hChange, TickerPrice, Trade } from "./types";
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
    <AppContainer>
      <Header>
        <img src={logo} alt="logo" height={56} />
        <h1>Coin Trader</h1>
      </Header>
      <Main>
        <InputSection>
          <Form allAssetsPairs={allAssetsPairs} onSubmit={handleSubmit} />
        </InputSection>
        <div>
          <Outputs
            tickerPrice={tickerPrice}
            ticker24hChange={ticker24hChange}
            recentTrades={recentTrades}
          />
          {!isDataAvailable && <div>Data not available</div>}
        </div>
      </Main>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  text-align: center;
  background-color: #ffffff;
  color: rgb(35, 39, 47);
`;

const Header = styled.header`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 22px 32px;
  font-size: calc(10px + 1vmin);
  color: rgb(240, 185, 11);
  font-family: "Gill Sans", sans-serif;
`;

const Main = styled.main`
  padding: 0 32px;
`;

const InputSection = styled.section``;

import { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.css";
import { AssetPair } from "./types";
import { Form } from "./Form";

function App() {
  const [allPairs, setAllPairs] = useState<AssetPair[]>();
  const binanceApi = "https://api1.binance.com";
  const exchangeInfoEndpoint = binanceApi + "/sapi/v1/convert/exchangeInfo";

  useEffect(() => {
    fetch(exchangeInfoEndpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(allPairs);
        setAllPairs(data);
        console.log(allPairs);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(allPairs);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
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
    </div>
  );
}

export default App;

import { Ticker24hChange, TickerPrice } from "./types";

export interface OutputsProps {
  selectedPair?: string;
  tickerPrice?: TickerPrice;
  ticker24hChange?: Ticker24hChange;
}

export const Outputs: React.FC<OutputsProps> = ({
  selectedPair,
  tickerPrice,
  ticker24hChange,
}) => {
  return (
    <div>
      <p>{selectedPair}</p>
      {tickerPrice && <div>Price {tickerPrice.price}</div>}
      {ticker24hChange && (
        <div>
          24h Change {ticker24hChange.priceChange} +{" "}
          {ticker24hChange.priceChangePercent} %
        </div>
      )}
    </div>
  );
};

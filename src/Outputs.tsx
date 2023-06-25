import { TradesTable } from "./TradesTable";
import { AssetPair, Ticker24hChange, TickerPrice, Trade } from "./types";

export interface OutputsProps {
  assets?: AssetPair;
  tickerPrice?: TickerPrice;
  ticker24hChange?: Ticker24hChange;
  recentTrades?: Trade[];
}

export const Outputs: React.FC<OutputsProps> = ({
  assets,
  tickerPrice,
  ticker24hChange,
  recentTrades,
}) => {
  return (
    <div>
      <div>
        {tickerPrice && <div>Price {tickerPrice.price}</div>}
        {ticker24hChange && (
          <div>
            24h Change {ticker24hChange.priceChange} +{" "}
            {ticker24hChange.priceChangePercent} %
          </div>
        )}
      </div>
      {recentTrades && <TradesTable trades={recentTrades} />}
    </div>
  );
};

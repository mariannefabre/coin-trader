import { styled } from "styled-components";
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
      <OutputsContainer>
        {recentTrades && <TradesTable trades={recentTrades} />}
        <Wrapper>
          {tickerPrice && (
            <Output>
              <StyledLabel>Price</StyledLabel>
              <StyledResult>{tickerPrice.price}</StyledResult>
            </Output>
          )}
          {ticker24hChange && (
            <Output>
              <StyledLabel>24h Change</StyledLabel>
              <StyledResult>
                {ticker24hChange.priceChange}{" "}
                {ticker24hChange.priceChangePercent}%
              </StyledResult>
            </Output>
          )}
        </Wrapper>
      </OutputsContainer>
    </div>
  );
};

const OutputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  gap: 18px;

  @media (min-width: 512px) {
    gap: 48px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: inherit;
  flex-wrap: wrap;
`;

const Output = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  color: rgb(159, 159, 159);
  font-size: 14px;
  text-align: left;
`;

const StyledResult = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
`;

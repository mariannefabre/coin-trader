import { AssetPair } from "./types";

export interface FormProps {
  assetPairs: AssetPair[] | undefined;
  onSubmit: (event: any) => Promise<void>;
}

export const Form: React.FC<FormProps> = ({ assetPairs, onSubmit }) => {
  const optionsList = assetPairs?.map((pair) => {
    const symbol = pair.fromAsset + pair.toAsset;
    const value = `${pair.fromAsset}/${pair.toAsset}`;

    return (
      <option key={symbol} value={symbol}>
        {value}
      </option>
    );
  });

  return (
    <form onSubmit={onSubmit}>
      <label>
        <select name="symbol" defaultValue="1INCH/BTC">
          {optionsList}
        </select>
      </label>
      <button type="submit">Trade</button>
    </form>
  );
};

import { AssetPair } from "./types";

export interface FormProps {
  allAssetsPairs: AssetPair[] | undefined;
  onSubmit: (event: any) => Promise<void>;
}

export const Form: React.FC<FormProps> = ({ allAssetsPairs, onSubmit }) => {
  const optionsList = allAssetsPairs?.map((assetsPair) => {
    const value = `${assetsPair.fromAsset}/${assetsPair.toAsset}`;
    const symbol = assetsPair.fromAsset + assetsPair.toAsset;

    return (
      <option key={symbol} value={symbol}>
        {value}
      </option>
    );
  });

  return (
    <form onSubmit={onSubmit}>
      <label>
        <select name="symbol">{optionsList}</select>
      </label>
      <button type="submit">Trade</button>
    </form>
  );
};

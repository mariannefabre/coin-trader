import { AssetPair } from "./types";

export interface FormProps {
  assetPairs: AssetPair[] | undefined;
  onSubmit: (event: any) => Promise<void>;
}

export const Form: React.FC<FormProps> = ({ assetPairs, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Currency pair
        <select name="symbol">
          {assetPairs &&
            assetPairs.map((pair) => {
              const key = `${pair.fromAsset}/${pair.toAsset}`;
              return <option key={key}>{key}</option>;
            })}
        </select>
      </label>
      <button type="submit">Ok</button>
    </form>
  );
};

import { styled } from "styled-components";
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
      <StyledOption key={symbol} value={symbol}>
        {value}
      </StyledOption>
    );
  });

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledSelect name="symbol">{optionsList}</StyledSelect>
      <StyledButton type="submit">Trade</StyledButton>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  justify-content: left;
  gap: 8px;
`;

const StyledSelect = styled.select`
  border: none;
  font-size: 22px;
`;

const StyledButton = styled.button`
  background: rgb(240, 185, 11);
  color: white;
  font-size: 18px;
  margin: 1em;
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  font-weight: bold;
`;

const StyledOption = styled.option`
  font-size: 12px;
`;

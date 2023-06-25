export interface Symbol {
  readonly symbol: string;
  readonly baseAsset: string;
  readonly quoteAsset: string;

}

export interface Symbols {
  readonly symbols: Symbol[];
}

export interface Asset {
  readonly symbol: string
}

export interface AssetPair {
  readonly fromAsset: string;
  readonly toAsset: string;
  readonly fromAssetMinAmount: string;
  readonly fromAssetMaxAmount: string;
  readonly toAssetMinAmount: string;
  readonly toAssetMaxAmount: string;
}

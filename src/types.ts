export interface AssetPair {
  readonly fromAsset: string;
  readonly toAsset: string;
}

export interface TickerPrice {
  readonly price: string;
}

export interface Ticker24hChange {
  readonly priceChange: string,
  readonly priceChangePercent: string
}

export interface ExchangeInfoResponse {
  readonly fromAsset: string;
  readonly toAsset: string;
  readonly fromAssetMinAmount: string;
  readonly fromAssetMaxAmount: string;
  readonly toAssetMinAmount: string;
  readonly toAssetMaxAmount: string;
}
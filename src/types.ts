export interface AssetPair {
  readonly fromAsset: string;
  readonly toAsset: string;
  readonly symbol?: string;
}

export interface TickerPrice {
  readonly price: string;
}

export interface Ticker24hChange {
  readonly priceChange: string,
  readonly priceChangePercent: string
}

export interface Trade {
  readonly id: string;
  readonly price: string;
  readonly qty: string;
  readonly time: number;
}
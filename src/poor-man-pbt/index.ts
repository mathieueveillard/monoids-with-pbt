export interface Stock {
  quantity: number;
}

export function combineStocks({ quantity: n1 }: Stock, { quantity: n2 }: Stock): Stock {
  return {
    quantity: n1 + n2,
  };
}

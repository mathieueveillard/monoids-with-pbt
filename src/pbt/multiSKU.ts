import { MonoSkuStock, MONO_SKU_NEUTRAL_STOCK, buildMonoSkuStock, combineMonoSkuStocks } from "./monoSKU";

export type MultiSkuStock = Record<string, MonoSkuStock>;

export function buildMultiSkuStock(name: string, quantity: number): MultiSkuStock {
  return {
    [name]: buildMonoSkuStock(quantity),
  };
}

export const MULTI_SKU_NEUTRAL_STOCK: MultiSkuStock = new Proxy(
  {},
  {
    get: function () {
      return MONO_SKU_NEUTRAL_STOCK;
    },
  }
);

export function combineMultiSkuStocks(first: MultiSkuStock, second: MultiSkuStock): MultiSkuStock {
  const firstItems = new Set(Object.keys(first));
  const secondItems = new Set(Object.keys(second));
  const allItems = new Set([...Array.from(firstItems), ...Array.from(secondItems)]);
  const result = {};
  Array.from(allItems).forEach((item) => {
    result[item] = combineMonoSkuStocks(first[item] || MONO_SKU_NEUTRAL_STOCK, second[item] || MONO_SKU_NEUTRAL_STOCK);
  });
  return result;
}

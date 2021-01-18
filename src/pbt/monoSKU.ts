export interface MonoSkuStock {
  quantity: number;
  computations: {
    min: number;
    sum: number;
    sumOfSquares: number;
    n: number;
  };
}

export function buildMonoSkuStock(quantity: number): MonoSkuStock {
  return {
    quantity,
    computations: {
      min: quantity,
      sum: quantity,
      sumOfSquares: quantity,
      n: 1,
    },
  };
}

export const MONO_SKU_NEUTRAL_STOCK: MonoSkuStock = {
  quantity: 0,
  computations: {
    min: Infinity,
    sum: 0,
    sumOfSquares: 0,
    n: 0,
  },
};

export function combineMonoSkuStocks(first: MonoSkuStock, second: MonoSkuStock): MonoSkuStock {
  const { quantity: q1, computations: c1 } = first;
  const { quantity: q2, computations: c2 } = second;

  return {
    quantity: q1 + q2,
    computations: {
      min: Math.min(c1.min, c2.min),
      sum: c1.sum + c2.sum,
      sumOfSquares: c1.sumOfSquares + c2.sumOfSquares,
      n: c1.n + c2.n,
    },
  };
}

export function computeMonoSkuAverageStock({ computations: { sum, n } }: MonoSkuStock): number {
  return sum / n;
}

export function computeMonoSkuStandardDeviationOfStock({
  computations: { sum, sumOfSquares, n },
}: MonoSkuStock): number {
  return Math.sqrt(sumOfSquares / n - (sum / n) ** 2);
}

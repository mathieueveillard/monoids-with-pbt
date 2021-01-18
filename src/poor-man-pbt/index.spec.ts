import { Stock, combineStocks } from ".";

function randomNaturalInteger(): number {
  return Math.round(Math.random() * 100);
}

function isStock(stock: Object): stock is Stock {
  const quantity = (stock as Stock).quantity;
  if (isNaN(quantity)) {
    return false;
  }
  return quantity === Math.round(quantity);
}

describe("Closure of the addition of stocks", function () {
  it("should ensure the closure of the addition of stocks for given values", function () {
    // GIVEN
    const a: Stock = {
      quantity: 20,
    };
    const b: Stock = {
      quantity: 30,
    };

    // WHEN
    const actual: Stock = combineStocks(a, b);

    // THEN
    const expected: Stock = {
      quantity: 50,
    };
    expect(actual).toEqual(expected);
  });

  it("should ensure the closure of the addition of stocks for random values", function () {
    // GIVEN
    const a: Stock = {
      quantity: randomNaturalInteger(),
    };
    const b: Stock = {
      quantity: randomNaturalInteger(),
    };

    // WHEN
    const actual: Stock = combineStocks(a, b);

    // THEN
    expect(isStock(actual)).toBe(true);
  });
});

describe("Neutral element", function () {
  it("A stock of 0 items should be a neutral element when adding stocks", function () {
    // GIVEN
    const a: Stock = {
      quantity: randomNaturalInteger(),
    };
    const neutralStock: Stock = {
      quantity: 0,
    };

    // WHEN
    const actual: Stock = combineStocks(a, neutralStock);

    // THEN
    expect(actual).toEqual(a);
  });

  it("A stock of 0 items should be a neutral element when adding stocks", function () {
    // GIVEN
    const a: Stock = {
      quantity: randomNaturalInteger(),
    };
    const neutralStock: Stock = {
      quantity: 0,
    };

    // WHEN
    const actual: Stock = combineStocks(neutralStock, a);

    // THEN
    expect(actual).toEqual(a);
  });
});

describe("Associativity", function () {
  it("The addition of stocks should be associative", function () {
    // GIVEN
    const a: Stock = {
      quantity: randomNaturalInteger(),
    };
    const b: Stock = {
      quantity: randomNaturalInteger(),
    };
    const c: Stock = {
      quantity: randomNaturalInteger(),
    };

    // WHEN
    const actual1: Stock = combineStocks(combineStocks(a, b), c);
    const actual2: Stock = combineStocks(a, combineStocks(b, c));

    // THEN
    expect(actual1).toEqual(actual2);
  });
});

import * as jsc from "jsverify";
import * as _ from "lodash";
import { MultiSkuStock, MULTI_SKU_NEUTRAL_STOCK, combineMultiSkuStocks, buildMultiSkuStock } from "./multiSKU";

describe("Neutral element", function () {
  it("A stock of 0 items should be a neutral element when adding stocks", function () {
    const assertion = jsc.forall(jsc.string, jsc.nat, function (name: string, quantity: number): boolean {
      // GIVEN
      const stock: MultiSkuStock = buildMultiSkuStock(name, quantity);

      // WHEN
      const actual: MultiSkuStock = combineMultiSkuStocks(stock, MULTI_SKU_NEUTRAL_STOCK);

      // THEN
      return _.isEqual(actual, stock);
    });
    jsc.assert(assertion);
  });

  it("A stock of 0 items should be a neutral element when adding stocks", function () {
    const assertion = jsc.forall(jsc.string, jsc.nat, function (name: string, quantity: number): boolean {
      // GIVEN
      const stock: MultiSkuStock = buildMultiSkuStock(name, quantity);

      // WHEN
      const actual: MultiSkuStock = combineMultiSkuStocks(MULTI_SKU_NEUTRAL_STOCK, stock);

      // THEN
      return _.isEqual(actual, stock);
    });
    jsc.assert(assertion);
  });
});

describe("Associativity", function () {
  it("The addition of stocks should be associative", function () {
    const assertion = jsc.forall(
      jsc.string,
      jsc.string,
      jsc.string,
      jsc.nat,
      jsc.nat,
      jsc.nat,
      function (n1: string, n2: string, n3: string, q1: number, q2: number, q3: number): boolean {
        // GIVEN
        const a: MultiSkuStock = buildMultiSkuStock(n1, q1);
        const b: MultiSkuStock = buildMultiSkuStock(n2, q2);
        const c: MultiSkuStock = buildMultiSkuStock(n3, q3);

        // WHEN
        const actual1: MultiSkuStock = combineMultiSkuStocks(combineMultiSkuStocks(a, b), c);
        const actual2: MultiSkuStock = combineMultiSkuStocks(a, combineMultiSkuStocks(b, c));

        // THEN
        return _.isEqual(actual1, actual2);
      }
    );
    jsc.assert(assertion);
  });
});

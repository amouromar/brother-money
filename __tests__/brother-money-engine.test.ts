import { calculateOverview, checkPurchase } from "../lib/brother-money/engine";
import { createSeedState } from "../lib/brother-money/seed";

describe("brother money engine", () => {
  it("calculates safe spend from seeded local data", () => {
    const overview = calculateOverview(createSeedState());

    expect(overview.availableCash).toBe(260);
    expect(overview.protectedMoney).toBe(218);
    expect(overview.safeSpendToday).toBe(42);
    expect(overview.status).toBe("safe");
  });

  it("rejects a purchase that is above safe spend", () => {
    const result = checkPurchase(createSeedState(), "Shoes", 100);

    expect(result.approved).toBe(false);
    expect(result.shortfall).toBe(58);
  });
});

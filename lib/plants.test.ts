import { describe, it, expect } from "vitest";
import { PLANTS, getPlantById, getPlantBySlug } from "./plants";

describe("plants catalog", () => {
  it("loads 29 plants", () => {
    expect(PLANTS).toHaveLength(29);
  });

  it("each plant has unique id and slug", () => {
    const ids = new Set(PLANTS.map((p) => p.id));
    const slugs = new Set(PLANTS.map((p) => p.slug));
    expect(ids.size).toBe(29);
    expect(slugs.size).toBe(29);
  });

  it("getPlantById finds existing plant", () => {
    expect(getPlantById("JA-S001")?.name).toBe("Alocasia Amazónica");
  });

  it("getPlantBySlug finds existing plant", () => {
    expect(getPlantBySlug("alocasia-amazonica")?.id).toBe("JA-S001");
  });

  it("returns undefined for unknown id", () => {
    expect(getPlantById("XX-000")).toBeUndefined();
  });
});

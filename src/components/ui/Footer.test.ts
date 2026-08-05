import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Footer from "./Footer.astro";
import { brand } from "../../config/brand";

describe("Footer attribution rendering", () => {
  it("does not render a separate attribution for the default whitelabel config", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Footer, { props: { brand } });

    expect(brand.buildType).toBe("whitelabel");
    expect(html.toLowerCase()).not.toContain("powered by");
  });

  it("renders the configured attribution for a direct build", async () => {
    const container = await AstroContainer.create();
    const directBrand = {
      buildType: "direct" as const,
      attribution: { label: "Ready Aim Digital", url: "https://readyaim.digital" },
    };
    const html = await container.renderToString(Footer, { props: { brand: directBrand } });

    expect(html).toContain("Ready Aim Digital");
    expect(html).toContain("https://readyaim.digital");
    expect(html.toLowerCase()).toContain("powered by");
  });
});

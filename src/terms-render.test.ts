import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

const requestUrl = (path: string) => new Request(new URL(path, "http://localhost/"));

describe("terms page rendered content", () => {
  it("renders the updated Terms eyebrow, footer email link, short version and clause 8/9 copy", async () => {
    const { default: Terms } = await import("../src/pages/terms.astro");
    const container = await AstroContainer.create();
    const html = await container.renderToString(Terms, { request: requestUrl("/terms") });

    // Hero eyebrow and placeholders
    expect(html).toContain(">Terms</span>");
    expect(html).not.toContain("Contract register");
    expect(html).not.toContain("[CONTACT DETAILS TO BE SUPPLIED]");
    expect(html).not.toContain("[EMAIL]");

    // Closing email link
    expect(html).toContain('href="mailto:hello@readyaim.digital"');
    expect(html).toContain("Email hello@readyaim.digital");

    // Short version: updated guarantee section
    expect(html).toContain("showing up in Google when someone searches your business name and your area");
    expect(html).toContain("The guarantee is about Google, not AI.");
    expect(html).toContain("It doesn&#39;t cover ChatGPT, Google&#39;s AI Overviews, Perplexity or any other AI assistant.");
    expect(html).toContain("Your rights under the Australian Consumer Law always apply, on top of everything above.");

    // Clause 8 and 9 copy (Astro encodes apostrophes as &#39;)
    expect(html).toContain("8.1 Here&#39;s the guarantee, in full:");
    expect(html).toContain("8.3 The guarantee is Google Search only.");
    expect(html).toContain("9.1");
    expect(html).toContain("The 90-day guarantee in clause 8 is the only outcome we guarantee.");
  });
});

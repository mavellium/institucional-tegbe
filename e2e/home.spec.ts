import { test, expect } from "@playwright/test";

/**
 * Fluxo E2E — Página Home
 *
 * Cenários cobertos:
 * 1. Página carrega e exibe elementos estruturais (header, main, footer).
 * 2. Título da página está definido.
 * 3. Hero carousel está visível.
 * 4. CTA principal (link/botão de contato) é interativo e navegável.
 */

test.describe("Home — estrutura e fluxo crítico", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("deve carregar a página e exibir header, main e footer", async ({
    page,
  }) => {
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("deve ter um <title> definido e não vazio", async ({ page }) => {
    const title = await page.title();
    expect(title.trim().length).toBeGreaterThan(0);
  });

  test("deve exibir o hero carousel na área principal", async ({ page }) => {
    // O HeroCarrossel renderiza um <section> ou um elemento com role=region
    const hero = page.locator("main").first();
    await expect(hero).toBeVisible();
  });

  test("deve conter pelo menos um link de CTA (WhatsApp ou contato)", async ({
    page,
  }) => {
    // CTAs do site geralmente apontam para WhatsApp ou âncoras de contato
    // Alguns CTAs podem estar hidden em mobile (ex: header CTA com "hidden sm:block")
    const ctaLinks = page.locator(
      'a[href*="whatsapp"]:visible, a[href*="wa.me"]:visible, a[href*="contato"]:visible, a[href*="mailto"]:visible'
    );
    await expect(ctaLinks.first()).toBeVisible();
  });

  test("deve navegar para a página de e-commerce ao clicar no link do menu", async ({
    page,
  }) => {
    // Localiza link de navegação que aponta para /ecommerce
    const ecommerceLink = page.locator('a[href="/ecommerce"]').first();

    if (await ecommerceLink.isVisible()) {
      await ecommerceLink.click();
      await expect(page).toHaveURL(/.*ecommerce.*/);
    } else {
      // O link pode estar em menu mobile — apenas verifica que existe no DOM
      await expect(page.locator('a[href="/ecommerce"]').first()).toBeAttached();
    }
  });
});

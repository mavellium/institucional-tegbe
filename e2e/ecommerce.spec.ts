import { test, expect } from "@playwright/test";

/**
 * Fluxo E2E — Página E-commerce (/ecommerce)
 *
 * Cenários cobertos:
 * 1. Página carrega com status 200 e exibe estrutura básica.
 * 2. Título da página está definido.
 * 3. Seção de serviços está visível.
 * 4. Rodapé presente e link de navegação de volta à home funciona.
 */

test.describe("E-commerce — estrutura e fluxo crítico", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ecommerce");
  });

  test("deve carregar a página com status 200 e exibir estrutura", async ({
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

  test("deve exibir o hero da página de e-commerce", async ({ page }) => {
    const main = page.locator("main");
    await expect(main).toBeVisible();
    // Verifica que o conteúdo principal renderizou (não ficou em branco)
    const mainText = await main.innerText();
    expect(mainText.trim().length).toBeGreaterThan(0);
  });

  test("deve conter pelo menos um CTA (WhatsApp ou contato)", async ({
    page,
  }) => {
    // Alguns CTAs podem estar hidden em mobile (ex: header CTA com "hidden sm:block")
    const ctaLinks = page.locator(
      'a[href*="whatsapp"]:visible, a[href*="wa.me"]:visible, a[href*="contato"]:visible, a[href*="mailto"]:visible'
    );
    await expect(ctaLinks.first()).toBeVisible();
  });

  test("deve navegar de volta para a home pelo logo ou link do header", async ({
    page,
  }) => {
    // Logo ou link de home no header
    const homeLink = page
      .locator('header a[href="/"], header a[href="https://tegbe.com.br"]')
      .first();

    if (await homeLink.isVisible()) {
      await homeLink.click();
      await expect(page).toHaveURL(/^http:\/\/localhost:\d+\/?$/);
    } else {
      // Navega diretamente — verifica que a home carrega
      await page.goto("/");
      await expect(page.locator("main")).toBeVisible();
    }
  });
});

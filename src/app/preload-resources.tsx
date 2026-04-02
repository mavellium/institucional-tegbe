export function PreloadResources() {
  return (
    <>
      {/* Preconnect a origens externas críticas */}
      <link rel="preconnect" href="https://tegbe-cdn.b-cdn.net" />
      <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://tegbe-dashboard.vercel.app" />

      {/* Preload fontes críticas */}
      <link
        rel="preload"
        href="/fonts/Satoshi-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Satoshi-Medium.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Satoshi-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}

export default async function run(page) {
  // Reload and peek during the loading overlay window to verify the bars render.
  await page.reload({ waitUntil: 'commit' });
  await page.waitForTimeout(450);
  const loader = await page.evaluate(() => {
    const bars = Array.from(document.querySelectorAll('.loader-bar'));
    return {
      loaderPresent: !!document.querySelector('.loading-screen'),
      barCount: bars.length,
      barHeights: bars.map((b) => Math.round(b.getBoundingClientRect().height)),
      barTransform: bars[0] ? getComputedStyle(bars[0]).transform !== 'none' : false,
    };
  });

  await page.waitForSelector('.hero-name', { timeout: 15000 });
  await page.waitForFunction(() => !document.querySelector('.loading-screen'), { timeout: 6000 }).catch(() => {});
  await page.waitForTimeout(400);

  const home = await page.evaluate(() => {
    const err = document.querySelector('nextjs-portal, [data-nextjs-dialog], #__next-build-error');
    return {
      errorOverlay: !!err,
      hero: !!document.querySelector('.hero-name'),
      figure: !!document.querySelector('.hero-figure'),
      vizPresent: !!document.querySelector('.viz'),
      figureTitle: document.querySelector('.figure-title')?.textContent,
      dots: document.querySelectorAll('.figure-dots span').length,
      onDots: document.querySelectorAll('.figure-dots span.on').length,
      eyebrow: document.querySelector('.hero-eyebrow')?.textContent,
      tags: Array.from(document.querySelectorAll('.hero-tag')).map((t) => t.textContent),
      statsRemoved: !document.querySelector('.hero-stats'),
      skillFlag: document.querySelector('.skill-flag')?.textContent || null,
    };
  });

  // Observe one cycle: the figure title should change within ~4.2s.
  const t1 = home.figureTitle;
  await page.waitForTimeout(4700);
  const t2 = await page.evaluate(() => document.querySelector('.figure-title')?.textContent);

  return { loader, home, cycled: t1 !== t2, from: t1, to: t2 };
}

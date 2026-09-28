const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { campaignUrl } = require('../scripts/campaign-url.cjs');
const source = fs.readFileSync(path.join(__dirname, '../js/analytics.js'), 'utf8');

function setup() {
  const listeners = {}, scripts = [], timers = [];
  const window = { location: new URL('https://laysun.co/?utm_source=linkedin&utm_medium=social&utm_campaign=test') };
  const document = {
    referrer: 'https://www.linkedin.com/', title: 'LaySun',
    createElement: () => ({}), head: { appendChild: s => scripts.push(s) },
    addEventListener: (event, callback) => { listeners[event] = callback; }
  };
  const context = vm.createContext({ window, document, URL, setTimeout: cb => timers.push(cb) });
  vm.runInContext(source, context);
  return { window, listeners, scripts, timers, context };
}

test('initial config contains attribution, one pageview, and duplicate guard', () => {
  const s = setup();
  const config = s.window.dataLayer.find(a => a[0] === 'config')[2];
  assert.equal(config.page_location, s.window.location.href);
  assert.equal(config.page_referrer, 'https://www.linkedin.com/');
  assert.equal(config.send_page_view, true);
  assert.equal(s.scripts.length, 1);
  vm.runInContext(source, s.context);
  assert.equal(s.scripts.length, 1);
  assert.equal(s.window.dataLayer.length, 2);
});

test('contact events exclude PII and internal non-quote navigation', () => {
  const s = setup();
  const click = href => s.listeners.click({ target: { closest: () => ({ href }) } });
  click('mailto:private@example.com?body=private');
  click('https://wa.me/123?text=private');
  click('tel:123');
  click('https://calendar.app.google/example');
  click('https://laysun.co/quote.html');
  click('https://laysun.co/quote');
  click('https://other.test/quote');
  click('https://laysun.co/products');
  const events = s.window.dataLayer.filter(a => a[0] === 'event');
  assert.deepEqual(Array.from(events, a => a[1]), ['email_click', 'whatsapp_click', 'phone_click', 'booking_click', 'quote_request_click', 'quote_request_click']);
  assert.ok(!JSON.stringify(events).includes('private'));
});

test('redirect callback and timeout are bounded and execute only once', () => {
  const s = setup();
  let redirects = 0;
  s.window.laysunTrack('generate_lead', { form_id: 'quote' }, () => redirects++);
  s.timers[0]();
  s.window.dataLayer.at(-1)[2].event_callback();
  assert.equal(redirects, 1);
  const blocked = setup();
  blocked.window.gtag = () => { throw new Error('blocked'); };
  blocked.window.laysunTrack('generate_lead', {}, () => redirects++);
  blocked.timers[0]();
  assert.equal(redirects, 2);
});

test('campaign builder preserves query and fragment, validates labels', () => {
  const built = new URL(campaignUrl('https://laysun.co/quote?product=olive#form', 'linkedin', 'social', '2026-09_hotels', 'post_a'));
  assert.equal(built.searchParams.get('product'), 'olive');
  assert.equal(built.searchParams.get('utm_content'), 'post_a');
  assert.equal(built.hash, '#form');
  assert.throws(() => campaignUrl('https://other.test', 'a', 'b', 'c'));
  assert.throws(() => campaignUrl('https://laysun.co', 'Linked In', 'social', 'c'));
});

test('target metadata and schema are valid; FAQs contain six to eight questions', () => {
  for (const file of ['index.html', 'manufacturing.html', 'blog-biophilic-office-design-artificial-plants-commercial.html']) {
    const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    const description = html.match(/name="description" content="([^"]+)"/)[1];
    assert.ok(title.replaceAll('&amp;', '&').length <= 60);
    assert.ok(description.length <= 160);
    for (const prefix of ['og', 'twitter']) {
      assert.ok(html.includes(`${prefix}:title" content="${title}"`));
      assert.ok(html.includes(`${prefix}:description" content="${description}"`));
    }
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      JSON.parse(match[1]);
      if (file === 'index.html') assert.doesNotMatch(match[1], /"(?:review|aggregateRating|reviewRating)"\s*:|"@type"\s*:\s*"(?:Review|AggregateRating|Rating)"/i);
    }
    const faq = html.match(/<section[^>]*aria-labelledby="[^"]*-faq"[\s\S]*?<\/section>/)[0];
    assert.ok([6, 7, 8].includes((faq.match(/<h3\b/g) || []).length));
    assert.equal((html.match(/js\/analytics\.js/g) || []).length, 1);
  }
});

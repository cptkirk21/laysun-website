const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const slug='uv-protection-outdoor-artificial-plants';
const html=fs.readFileSync(path.join(root,'blog-'+slug+'.html'),'utf8');
test('UV article contains placed visuals, guide CTA, and valid schema',()=>{
 assert.ok(html.indexOf('blog-uv-material-intact-800w.webp')>html.indexOf('id="material-comparison"'));
 assert.ok(html.indexOf('blog-uv-material-intact-800w.webp')<html.indexOf('id="spray-on"'));
 assert.ok(html.indexOf('blog-uv-exposure-zones-800w.webp')>html.indexOf('id="location"'));
 assert.ok(html.indexOf('blog-uv-exposure-zones-800w.webp')<html.indexOf('id="complete-guide"'));
 assert.ok(html.includes('href="uv-protection-guide.html"'));
 assert.doesNotMatch(html,/IMAGE PLACEHOLDER/);
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
 assert.equal(schema['@type'],'BlogPosting');
 assert.equal(schema.datePublished,'2026-09-30');
 for(const img of html.matchAll(/<img[^>]*src="images\/blog-uv-[^>]+>/g)) {
  assert.match(img[0],/srcset=/);assert.match(img[0],/width=/);assert.match(img[0],/height=/);assert.match(img[0],/decoding="async"/);
 }
});
test('UV article is discoverable in the blog index, static listing, feed and sitemap',()=>{
 const posts=JSON.parse(fs.readFileSync(path.join(root,'blog-index.json'),'utf8')).posts;
 assert.equal(posts[0].slug,slug);
 for(const file of ['blog.html','rss.xml','sitemap.xml']) assert.ok(fs.readFileSync(path.join(root,file),'utf8').includes('blog-'+slug));
});

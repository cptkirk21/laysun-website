const { URL } = require('node:url');

function campaignUrl(destination, source, medium, campaign, content) {
  const url = new URL(destination);
  if (url.protocol !== 'https:' || !['laysun.co', 'www.laysun.co'].includes(url.hostname)) {
    throw new Error('Use an HTTPS LaySun destination.');
  }
  for (const [key, value] of Object.entries({ source, medium, campaign })) {
    if (!value || !/^[a-z0-9][a-z0-9_-]*$/.test(value)) {
      throw new Error(key + ' must be a lowercase label using letters, numbers, underscores or hyphens.');
    }
    url.searchParams.set('utm_' + key, value);
  }
  if (content) url.searchParams.set('utm_content', content);
  return url.href;
}

module.exports = { campaignUrl };
if (require.main === module) {
  try { console.log(campaignUrl(...process.argv.slice(2))); }
  catch (error) {
    console.error(error.message + '\nUsage: node scripts/campaign-url.cjs URL SOURCE MEDIUM CAMPAIGN [CONTENT]');
    process.exitCode = 1;
  }
}

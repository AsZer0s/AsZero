hexo.extend.filter.register('after_generate', function () {
    const fs = require('fs');
    const path = require('path');
    const sitemapPath = path.join(hexo.public_dir, 'sitemap.xml');

    if (fs.existsSync(sitemapPath)) {
        let sitemap = fs.readFileSync(sitemapPath, 'utf-8');
        sitemap = sitemap.replace(/<lastmod>(.*?)<\/lastmod>/g, function (match, p1) {
            const post = hexo.locals.get('posts').find(post => post.permalink === match);
            return `<lastmod>${post.date.toISOString()}</lastmod>`;
        });
        fs.writeFileSync(sitemapPath, sitemap);
    }
});

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://dsluong.com';
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Mock Data (Sync with storage.js)
const products = [
  "syl-100-sun-lux", "biocelmask-calm-effect", "hair-mask", "frequent-use-shampoo",
  "refresh-toner", "balance-lotion", "bust-firming-gel", "body-glycolic-cream",
  "anti-dandruff-shampoo", "anti-hair-loss-shampoo", "greasy-hair-shampoo", "antiaging-liposome-cream"
];

const posts = [
  "top-5-thanh-phan-chong-lao-hoa", "cach-chon-kem-chong-nang-da-dau-mun",
  "retinol-co-thuc-su-lam-mong-da", "quy-trinh-cham-soc-da-co-ban",
  "nam-da-va-cach-dieu-tri-hieu-qua", "review-san-pham-syl-100-sun-lux"
];

const staticPages = ['', '/shop', '/blog', '/about', '/contact', '/policies'];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static Pages
  staticPages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${page}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Product Pages
  products.forEach(slug => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/san-pham/${slug}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  });

  // Blog Pages
  posts.forEach(slug => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/blog/${slug}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();

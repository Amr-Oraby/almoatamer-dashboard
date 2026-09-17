const fs = require('fs');
const path = require('path');

const replacements = [
  // Blogs
  { target: "'/blogs'", replacement: "'/blogs/show-all'" },
  { target: '"/blogs"', replacement: '"/blogs/show-all"' },
  { target: '`/${localeCode}/blogs`', replacement: '`/${localeCode}/blogs/show-all`' },
  { target: '`/${locale}/blogs`', replacement: '`/${locale}/blogs/show-all`' },
  { target: 'href="/blogs"', replacement: 'href="/blogs/show-all"' },
  { target: 'href="/ar/blogs"', replacement: 'href="/ar/blogs/show-all"' },
  { target: "href={'/blogs'}", replacement: "href={'/blogs/show-all'}" },

  // Referral Links
  { target: "'/referral-links'", replacement: "'/referral-links/show-all'" },
  { target: '"/referral-links"', replacement: '"/referral-links/show-all"' },
  { target: '`/${localeCode}/referral-links`', replacement: '`/${localeCode}/referral-links/show-all`' },
  { target: '`/${locale}/referral-links`', replacement: '`/${locale}/referral-links/show-all`' },
  
  // Countries
  { target: "'/places/countries'", replacement: "'/countries/show-all'" },
  { target: '"/places/countries"', replacement: '"/countries/show-all"' },
  { target: '`/${localeCode}/places/countries`', replacement: '`/${localeCode}/countries/show-all`' },
  { target: '`/${locale}/places/countries`', replacement: '`/${locale}/countries/show-all`' },
  { target: 'href="/ar/places/countries"', replacement: 'href="/ar/countries/show-all"' },
  { target: '`/places/countries/show/${row.original.id}`', replacement: '`/countries/show/${row.original.id}`' },
  { target: '`/places/countries/update/${row.original.id}`', replacement: '`/countries/update/${row.original.id}`' },
  { target: '`/${locale}/places/countries/create`', replacement: '`/${locale}/countries/create`' },

  // Languages
  { target: "'/languages'", replacement: "'/languages/show-all'" },
  { target: '"/languages"', replacement: '"/languages/show-all"' },
  { target: '`/${localeCode}/languages`', replacement: '`/${localeCode}/languages/show-all`' },
  { target: '`/${locale}/languages`', replacement: '`/${locale}/languages/show-all`' },
  { target: 'href="/ar/languages"', replacement: 'href="/ar/languages/show-all"' },
  
  // Users Chats
  { target: "'/contact/users-chats'", replacement: "'/users-chats/show-all'" },
  { target: '"/contact/users-chats"', replacement: '"/users-chats/show-all"' },
  { target: '`/${localeCode}/contact/users-chats`', replacement: '`/${localeCode}/users-chats/show-all`' },
  { target: '`/${locale}/contact/users-chats`', replacement: '`/${locale}/users-chats/show-all`' },
  { target: '`/contact/users-chats/show/${row.original.id}`', replacement: '`/users-chats/show/${row.original.id}`' },
  { target: 'href="/ar/contact/users-chats"', replacement: 'href="/ar/users-chats/show-all"' },
];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
        results = results.concat(walkDir(fullPath));
      }
    } else {
      if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = walkDir('C:/almoatamer-dashboard');

let totalReplaced = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(rep => {
    // Escape string for regex if it contains special chars, or just use split/join for simplicity
    content = content.split(rep.target).join(rep.replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
    totalReplaced++;
  }
});

console.log(`Total files updated: ${totalReplaced}`);

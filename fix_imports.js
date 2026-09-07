const fs = require('fs');

const files = [ 
  'c:/almoatamer-dashboard/features/seo/components/SeoTable.tsx', 
  'c:/almoatamer-dashboard/features/roles/components/RolesTable.tsx', 
  'c:/almoatamer-dashboard/features/report-reason/components/ReportReasonsTable.tsx', 
  'c:/almoatamer-dashboard/features/referral-links/components/ReferralLinksTable.tsx', 
  'c:/almoatamer-dashboard/features/notifications/components/NotificationsTable.tsx', 
  'c:/almoatamer-dashboard/features/moatmrs/components/MoatmrsTable.tsx', 
  'c:/almoatamer-dashboard/features/news/components/NewsTable.tsx', 
  'c:/almoatamer-dashboard/features/languages/components/LanguagesTable.tsx', 
  'c:/almoatamer-dashboard/features/home-banners/components/HomeBannersTable.tsx', 
  'c:/almoatamer-dashboard/features/faq/components/FaqTable.tsx', 
  'c:/almoatamer-dashboard/features/coupons/components/CouponsTable.tsx', 
  'c:/almoatamer-dashboard/features/countries/components/CountriesTable.tsx', 
  'c:/almoatamer-dashboard/features/blogs/components/BlogsTable.tsx', 
  'c:/almoatamer-dashboard/features/admins/components/AdminsTable.tsx' 
];

files.forEach(f => { 
  let content = fs.readFileSync(f, 'utf8'); 
  if (!content.includes('import { DeleteDialog }')) { 
    const lastImport = content.lastIndexOf('import '); 
    if (lastImport !== -1) { 
      const eol = content.indexOf('\n', lastImport); 
      content = content.slice(0, eol) + '\nimport { DeleteDialog } from "@/components/ui/delete-dialog";' + content.slice(eol); 
      fs.writeFileSync(f, content); 
      console.log('Fixed ' + f.split('/').pop()); 
    } 
  } 
});

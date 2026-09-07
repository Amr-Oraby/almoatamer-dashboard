const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "c:/almoatamer-dashboard/features/seo/components/SeoTable.tsx",
  "c:/almoatamer-dashboard/features/roles/components/RolesTable.tsx",
  "c:/almoatamer-dashboard/features/report-reason/components/ReportReasonsTable.tsx",
  "c:/almoatamer-dashboard/features/referral-links/components/ReferralLinksTable.tsx",
  "c:/almoatamer-dashboard/features/notifications/components/NotificationsTable.tsx",
  "c:/almoatamer-dashboard/features/moatmrs/components/MoatmrsTable.tsx",
  "c:/almoatamer-dashboard/features/news/components/NewsTable.tsx",
  "c:/almoatamer-dashboard/features/languages/components/LanguagesTable.tsx",
  "c:/almoatamer-dashboard/features/home-banners/components/HomeBannersTable.tsx",
  "c:/almoatamer-dashboard/features/faq/components/FaqTable.tsx",
  "c:/almoatamer-dashboard/features/coupons/components/CouponsTable.tsx",
  "c:/almoatamer-dashboard/features/countries/components/CountriesTable.tsx",
  "c:/almoatamer-dashboard/features/blogs/components/BlogsTable.tsx",
  "c:/almoatamer-dashboard/features/admins/components/AdminsTable.tsx"
];

for (const filePath of filesToUpdate) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the function name from the inside of the AlertDialog
  // It usually looks like: deleteSeo(deleteId
  const match = content.match(/if\s*\(deleteId\)\s*\{\s*([a-zA-Z0-9_]+)\(deleteId/);
  if (!match) {
    console.log(`Could not find delete function name in ${filePath}`);
    continue;
  }
  
  const deleteFunction = match[1];
  
  // Find isDeleting variable (could be isDeleting or isPending)
  // Usually inside AlertDialogCancel disabled={isDeleting} or AlertDialogAction
  let isDeletingVar = "isDeleting";
  const disabledMatch = content.match(/disabled={([a-zA-Z0-9_]+)}/);
  if (disabledMatch) {
      isDeletingVar = disabledMatch[1];
  } else {
      // let's try to infer from the hook: const { mutate: xxx, isPending: isDeleting }
      const hookMatch = content.match(/isPending:\s*([a-zA-Z0-9_]+)/);
      if(hookMatch) {
          isDeletingVar = hookMatch[1];
      }
  }

  // Replace the AlertDialog block
  const dialogRegex = /<AlertDialog\s+open=\{\!\!deleteId\}[\s\S]*?<\/AlertDialog>/g;
  
  const replacement = `<DeleteDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            ${deleteFunction}(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        isDeleting={${isDeletingVar}}
      />`;
      
  content = content.replace(dialogRegex, replacement);
  
  // Update imports
  // Remove AlertDialog imports safely
  content = content.replace(/import\s*\{[^}]*?AlertDialog[^}]*?\}\s*from\s*['"]@\/components\/ui\/alert-dialog['"];?\n?/g, '');
  
  // Add DeleteDialog import if not there
  if (!content.includes('DeleteDialog')) {
      // Find last import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
          const endOfLine = content.indexOf('\n', lastImportIndex);
          content = content.slice(0, endOfLine) + '\nimport { DeleteDialog } from "@/components/ui/delete-dialog";' + content.slice(endOfLine);
      }
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

console.log("Done refactoring.");

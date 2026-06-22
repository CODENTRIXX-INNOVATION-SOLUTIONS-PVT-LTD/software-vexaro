const { execSync } = require('child_process');
const fs = require('fs');

const manualFiles = new Set([
  'src/app/dashboards/distributor-dashboard/distributor-dashboard.css',
  'src/app/dashboards/merchant-dashboard/merchant-dashboard.css',
  'src/app/dashboards/super-admin-dashboard/super-admin-dashboard.css',
  'src/app/shared/sidebar/sidebar.css',
  'src/app/components/stats-cards/stats-cards.css',
  'src/app/pages/super-admin/dashboard/dashboard.css',
  'src/app/pages/super-admin/tracking/tracking.css',
  'src/app/pages/merchant/reports/reports.css',
  'src/app/pages/merchant/payments/payments.css',
  'src/app/pages/super-admin/disputes/dispute-list/dispute-list.css'
]);

try {
  // Get all modified files from git status
  const output = execSync('git status --porcelain', { encoding: 'utf8' });
  const lines = output.split('\n');
  
  let revertedCount = 0;
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // git status --porcelain output lines start with ' M ', '?? ', etc.
    const status = line.slice(0, 2);
    const filepath = line.slice(3).trim().replace(/\\/g, '/');
    
    // We only care about modified CSS files
    if (status === ' M' && filepath.endsWith('.css')) {
      if (!manualFiles.has(filepath)) {
        console.log(`Reverting: ${filepath}`);
        execSync(`git checkout HEAD -- "${filepath}"`);
        revertedCount++;
      } else {
        console.log(`Skipping manual file: ${filepath}`);
      }
    }
  }
  
  console.log(`Successfully reverted ${revertedCount} auto-modified CSS files.`);
} catch (error) {
  console.error('Error running revert script:', error);
}

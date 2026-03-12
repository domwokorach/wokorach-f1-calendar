const fs = require('fs');

const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY || 'f1';
const siteFolder = `_public/${SITE_KEY}`;

// App Files (Files that should be added to src/app so Next generates various icons for us)
const appFiles = ['favicon.ico', 'icon.ico', 'apple-icon.png'];

if (!fs.existsSync(siteFolder)) {
	console.warn(
		`[public-assets] Skipping: folder not found: ${siteFolder}. ` +
			`Set NEXT_PUBLIC_SITE_KEY (e.g. ${SITE_KEY}) or create the folder.`,
	);
	module.exports = {};
	return;
}

// Public Files
const filenames = fs.readdirSync(siteFolder);
filenames.forEach((file) => {
	fs.copyFile(`${siteFolder}/${file}`, `public/${file}`, (err) => {
		if (err) console.warn('[public-assets] Failed copying to public:', file, err);
		else console.log('[public-assets] Copied file to public:', file);
	});

	if (appFiles.includes(file)) {
		fs.copyFile(`${siteFolder}/${file}`, `src/app/${file}`, (err) => {
			if (err) console.warn('[public-assets] Failed copying to src/app:', file, err);
			else console.log('[public-assets] Copied file to src/app:', file);
		});
	}
});

module.exports = {};
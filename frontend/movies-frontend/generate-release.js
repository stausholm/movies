const log = console.log;

log('This utility will walk you through creating a release.');
log('It only covers the most common features. For more control, manual edits are requried.');
log('Press ^C at any time to quit');
log('Type of release:');

// # prompt
// npm run generate-release
// ___
// "Type of release:"
// • MAJOR (When you make incompatible API changes)
// • MINOR (When you add functionality in a backwards compatible manner)
// • PATCH (When you make backwards compatible bugfixes)
// ___
// "Types of changes in release:"
// • Added (for new features)
// • Changed (for changes in existing functionality)
// • Deprecated (for soon-to-be removed features)
// • Removed (for now removed features)
// • Fixed (for any bug fixes)
// • Security (in case of vulnerabilities)
// ___
// "List all new features added. Press enter to add multiple. Press ctrl+enter to continue:"
// ___
// "List all changes to existing functionality. Press enter to add multiple. Press ctrl+enter to continue:"
// ___
// "List all new deprecations. Press enter to add multiple. Press ctrl+enter to continue:"
// ___
// "List all now removed features. Press enter to add multiple. Press ctrl+enter to continue:"
// ___
// "List all fixed bugs. Press enter to add multiple. Press ctrl+enter to continue:"
// ___
// "List all Security related changes. Press enter to add multiple. Press ctrl+enter to continue:"
// ___
// "Add a summary to this release (Y/N). Press ctrl+enter to continue:"
// ___
// "Confirm release 1.2.3 (Y/N):"
// ## [1.2.3] *2022-03-27*
// This is an optional summary added

// ### Added
// - lorem ipsum dolor sit amet
// - lorem ipsum dolor sit amet

// ### Changed
// - lorem ipsum dolor sit amet
// - lorem ipsum dolor sit amet

// ### Deprecated
// - lorem ipsum dolor sit amet
// - lorem ipsum dolor sit amet
// ___
// if no "Release cancelled"
// if yes "SiteSettings.json and changelog.md updated to v 1.2.3"

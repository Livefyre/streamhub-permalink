var packageAttributeBuilder = require('livefyre-package-attribute');
var packageJson = require('json!streamhub-permalink/../package.json');

/**
 * Object with methods for decorating elements and views with an HTML
 * attribute specific to this version of streamhub-permalink
 */
module.exports = packageAttributeBuilder(packageJson);

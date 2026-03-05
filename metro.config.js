const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add HTML to asset extensions so Metro can bundle it
config.resolver.assetExts.push('html');

module.exports = config;

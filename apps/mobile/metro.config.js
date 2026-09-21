// Metro needs two things in a monorepo: the workspace root on its watch list,
// so edits to packages/shared trigger a reload, and the root node_modules on
// its resolver path, since PNPM installs shared dependencies there.
//
// See also node-linker in .npmrc.

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;

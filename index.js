#!/usr/bin/env node

'use strict';

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', cyan: '\x1b[36m',
  green: '\x1b[32m', yellow: '\x1b[33m', red: '\x1b[31m',
  dim: '\x1b[2m', magenta: '\x1b[35m', blue: '\x1b[34m',
};

const log = {
  info: (msg) => console.log(`${c.cyan}ℹ${c.reset}  ${msg}`),
  success: (msg) => console.log(`${c.green}✔${c.reset}  ${msg}`),
  error: (msg) => console.log(`${c.red}✖${c.reset}  ${msg}`),
  warn: (msg) => console.log(`${c.yellow}⚠${c.reset}  ${msg}`),
  step: (n, msg) => console.log(`\n${c.bold}${c.blue}[${n}]${c.reset} ${c.bold}${msg}${c.reset}`),
  dim: (msg) => console.log(`    ${c.dim}${msg}${c.reset}`),
  banner: () => console.log(`
    ${c.cyan}${c.bold}     ██╗██╗████████╗ █████╗ ███╗   ██╗${c.reset}
    ${c.cyan}${c.bold}     ██║██║╚══██╔══╝██╔══██╗████╗  ██║${c.reset}
    ${c.cyan}${c.bold}     ██║██║   ██║   ███████║██╔██╗ ██║${c.reset}
    ${c.cyan}${c.bold}██   ██║██║   ██║   ██╔══██║██║╚██╗██║${c.reset}
    ${c.cyan}${c.bold}╚█████╔╝██║   ██║   ██║  ██║██║ ╚████║${c.reset}
    ${c.cyan}${c.bold} ╚════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝${c.reset}
    ${c.cyan}${c.bold}  ██████╗  ██████╗ ██╗██╗     ███████╗██████╗ ██████╗ ██╗      █████╗ ████████╗███████╗${c.reset}
    ${c.cyan}${c.bold}  ██╔══██╗██╔═══██╗██║██║     ██╔════╝██╔══██╗██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝${c.reset}
    ${c.cyan}${c.bold}  ██████╔╝██║   ██║██║██║     █████╗  ██████╔╝██████╔╝██║     ███████║   ██║   █████╗  ${c.reset}
    ${c.cyan}${c.bold}  ██╔══██╗██║   ██║██║██║     ██╔══╝  ██╔══██╗██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ${c.reset}
    ${c.cyan}${c.bold}  ██████╔╝╚██████╔╝██║███████╗███████╗██║  ██║██║     ███████╗██║  ██║   ██║   ███████╗${c.reset}
    ${c.cyan}${c.bold}  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝${c.reset}
    ${c.dim}  Production-ready React Native · Expo Bare · 2026 Stack${c.reset}
    `),
};

function prompt(question, defaultVal = '') {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    const hint = defaultVal ? ` ${c.dim}(${defaultVal})${c.reset}` : '';
    rl.question(`${c.bold}${c.cyan}?${c.reset} ${question}${hint}: `, (ans) => {
      rl.close();
      resolve(ans.trim() || defaultVal);
    });
  });
}

function promptSelect(question, options, defaultIdx = 0) {
  return new Promise((resolve) => {
    console.log(`\n${c.bold}${c.cyan}?${c.reset} ${question}`);
    options.forEach((opt, i) => {
      const marker = i === defaultIdx ? `${c.green}●${c.reset}` : `${c.dim}○${c.reset}`;
      console.log(`  ${marker} ${c.cyan}${i + 1})${c.reset} ${opt}`);
    });
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(`\n  ${c.dim}Enter number [${defaultIdx + 1}]:${c.reset} `, (ans) => {
      rl.close();
      const idx = parseInt(ans.trim()) - 1;
      resolve(options[idx >= 0 && idx < options.length ? idx : defaultIdx]);
    });
  });
}

function isInstalled(tool) {
  const result = spawnSync(tool, ['--version'], { shell: true, stdio: 'pipe' });
  return result.status === 0;
}

function run(cmd, cwd) {
  const result = spawnSync(cmd, { cwd, shell: true, stdio: 'inherit' });
  if (result.status !== 0) { log.error(`Failed: ${cmd}`); process.exit(1); }
}

function getLatestVersion(pkg) {
  try {
    return execSync(`npm show ${pkg} version`, { encoding: 'utf8', stdio: 'pipe' }).trim();
  } catch { return 'latest'; }
}

function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();
}

function toPascal(str) {
  return str.replace(/[-_\s]+(.)/g, (_, ch) => ch.toUpperCase()).replace(/^(.)/, (_, ch) => ch.toUpperCase());
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

function patchDir(dir, replacements) {
  const exts = ['.ts', '.tsx', '.js', '.json', '.md', '.gradle', '.plist', '.xml', '.hbs'];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      patchDir(full, replacements);
    } else if (exts.some(e => entry.name.endsWith(e))) {
      let content = fs.readFileSync(full, 'utf8');
      for (const [from, to] of replacements) content = content.split(from).join(to);
      fs.writeFileSync(full, content);
    }
  }
}

const PACKAGES = {
  deps: [
    'expo', '@react-navigation/native', '@react-navigation/native-stack',
    '@react-navigation/bottom-tabs', 'react-native-screens',
    'react-native-safe-area-context', '@reduxjs/toolkit', 'react-redux',
    'react-native-mmkv', 'nativewind', 'tailwindcss', 'react-native-svg',
    'i18next', 'react-i18next', 'react-hook-form', '@hookform/resolvers', 'zod',
    'react-native-toast-message', 'react-native-splash-screen',
    'react-native-config', 'react-native-vector-icons',
    'class-variance-authority', 'clsx', 'axios',
  ],
  devDeps: [
    'jest', 'jest-expo', '@testing-library/react-native',
    '@testing-library/jest-native', 'msw',
    '@types/react', '@types/react-native',
    '@typescript-eslint/eslint-plugin', '@typescript-eslint/parser',
    'eslint', 'eslint-plugin-react', 'eslint-plugin-react-hooks',
    'eslint-plugin-react-native', 'prettier', 'husky', 'lint-staged',
    'plop', 'react-native-svg-transformer', '@babel/core',
    'babel-plugin-module-resolver', 'typescript',
  ],
};

async function main() {
  log.banner();

  const appName     = await prompt('App name', 'MyApp');
  const bundleId    = await prompt('Bundle ID', `com.${appName.toLowerCase().replace(/[^a-z0-9]/g, '')}`);
  const defaultLang = await promptSelect('Default language', ['en', 'hi', 'ar', 'fr', 'es']);
  const pkgManager  = await promptSelect('Package manager', ['npm', 'yarn', 'bun']);

  const packageName   = toKebab(appName);
  const componentName = toPascal(appName);
  const targetDir     = path.join(process.cwd(), packageName);

  console.log('');
  log.info(`Creating ${c.bold}${componentName}${c.reset} → ${c.cyan}./${packageName}${c.reset}`);
  log.dim(`Bundle ID : ${bundleId}`);
  log.dim(`Language  : ${defaultLang} | Manager: ${pkgManager}`);

  if (fs.existsSync(targetDir)) {
    log.error(`Directory "${packageName}" already exists.`);
    process.exit(1);
  }

  log.step(1, 'Copying template files...');
  copyDir(path.join(__dirname, 'template'), targetDir);
  const iosSrc = path.join(targetDir, 'ios', 'APP_NAME');
  if (fs.existsSync(iosSrc)) fs.renameSync(iosSrc, path.join(targetDir, 'ios', componentName));
  log.success('Template copied');

  log.step(2, 'Configuring app identity...');
  patchDir(targetDir, [
    ['{{APP_NAME}}', appName], ['{{PACKAGE_NAME}}', packageName],
    ['{{COMPONENT_NAME}}', componentName], ['{{BUNDLE_ID}}', bundleId],
    ['{{DEFAULT_LANG}}', defaultLang],
  ]);
  log.success('Placeholders replaced');

  log.step(3, 'Fetching latest library versions from npm registry...');
  log.dim('No stale deps — versions are resolved at install time');

  const depVersions = {};
  for (const pkg of PACKAGES.deps) {
    process.stdout.write(`    ${c.dim}resolving ${pkg}...${c.reset}               \r`);
    depVersions[pkg] = `^${getLatestVersion(pkg)}`;
  }
  const devDepVersions = {};
  for (const pkg of PACKAGES.devDeps) {
    process.stdout.write(`    ${c.dim}resolving ${pkg}...${c.reset}               \r`);
    devDepVersions[pkg] = `^${getLatestVersion(pkg)}`;
  }
  process.stdout.write('                                                      \r');
  log.success('All versions resolved');

  const pkgJson = {
    name: packageName, version: '0.0.1', private: true, main: 'index.js',
    scripts: {
      start: 'expo start', android: 'expo run:android', ios: 'expo run:ios',
      test: 'jest --watchAll=false', 'test:watch': 'jest --watchAll',
      'test:coverage': 'jest --coverage',
      lint: 'eslint src --ext .ts,.tsx', 'lint:fix': 'eslint src --ext .ts,.tsx --fix',
      format: 'prettier --write "src/**/*.{ts,tsx}"',
      generate: 'plop --plopfile generators/plopfile.js',
      prepare: 'husky install', prebuild: 'expo prebuild',
    },
    dependencies: depVersions,
    devDependencies: devDepVersions,
    jest: {
      preset: 'jest-expo',
      setupFilesAfterFramework: ['@testing-library/jest-native/extend-expect'],
      setupFiles: ['./__mocks__/setupTests.ts'],
      moduleNameMapper: { '\\.svg$': './__mocks__/fileMock.js', '^@/(.*)$': '<rootDir>/src/$1' },
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|nativewind|class-variance-authority)',
      ],
    },
    'lint-staged': { 'src/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'] },
  };

  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(pkgJson, null, 2));
  log.success('package.json written');

  log.step(4, `Installing with ${pkgManager}...`);
  let manager = pkgManager;
  if (manager === 'yarn' && !isInstalled('yarn')) {
    log.warn(`yarn not found — falling back to npm`);
    manager = 'npm';
  } else if (manager === 'bun' && !isInstalled('bun')) {
    log.warn(`bun not found — falling back to npm`);
    manager = 'npm';
  }
  run(manager === 'yarn' ? 'yarn' : manager === 'bun' ? 'bun install' : 'npm install', targetDir);

  log.step(5, 'Initialising git + Husky hooks...');
  run('git init', targetDir);
  run('npx husky install', targetDir);
  log.success('Git hooks ready');

  console.log(`
${c.green}${c.bold}  ✅ ${componentName} is ready!${c.reset}

  ${c.dim}Next steps:${c.reset}
    ${c.cyan}cd ${packageName}${c.reset}
    ${c.cyan}npx expo run:ios${c.reset}          ${c.dim}# start on iOS${c.reset}
    ${c.cyan}npx expo run:android${c.reset}      ${c.dim}# start on Android${c.reset}

  ${c.cyan}npm run generate${c.reset}            ${c.dim}# generate screen / component / slice${c.reset}
  ${c.cyan}npm test${c.reset}                    ${c.dim}# run tests${c.reset}
  ${c.cyan}npm run test:coverage${c.reset}       ${c.dim}# coverage report${c.reset}

  ${c.dim}Happy shipping. 🚀${c.reset}
`);
}

main().catch((err) => { log.error(err.message); process.exit(1); });

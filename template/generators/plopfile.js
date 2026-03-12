/** @type {import('plop').NodePlopAPI} */
module.exports = function (plop) {
  // ── Screen Generator ────────────────────────────────────────────────────────
  plop.setGenerator('screen', {
    description: 'Create a new screen with test file',
    prompts: [
      {
        type: 'input', name: 'name',
        message: 'Screen name (e.g. Profile, Settings):',
      },
      {
        type: 'list', name: 'folder',
        message: 'Which feature folder?',
        choices: ['auth', 'home', 'onboarding', 'other'],
      },
      {
        type: 'input', name: 'customFolder',
        message: 'Custom folder name:',
        when: (ans) => ans.folder === 'other',
      },
    ],
    actions: (data) => {
      const folder = data.folder === 'other' ? data.customFolder : data.folder;
      return [
        {
          type: 'add',
          path: `../src/screens/${folder}/{{pascalCase name}}Screen.tsx`,
          templateFile: 'templates/screen.hbs',
        },
        {
          type: 'add',
          path: `../src/screens/${folder}/{{pascalCase name}}Screen.test.tsx`,
          templateFile: 'templates/screen.test.hbs',
        },
      ];
    },
  });

  // ── Component Generator ─────────────────────────────────────────────────────
  plop.setGenerator('component', {
    description: 'Create a new component with barrel export and test',
    prompts: [
      { type: 'input', name: 'name', message: 'Component name (e.g. Card, Avatar):' },
      {
        type: 'list', name: 'type',
        message: 'Component type?',
        choices: ['common', 'layout'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'templates/component.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'templates/component.test.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{type}}/{{pascalCase name}}/index.ts',
        templateFile: 'templates/barrel.hbs',
      },
    ],
  });

  // ── Slice Generator ─────────────────────────────────────────────────────────
  plop.setGenerator('slice', {
    description: 'Create a Redux slice with test file',
    prompts: [
      { type: 'input', name: 'name', message: 'Slice name (e.g. cart, notifications):' },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/store/slices/{{camelCase name}}Slice.ts',
        templateFile: 'templates/slice.hbs',
      },
      {
        type: 'add',
        path: '../src/store/slices/{{camelCase name}}Slice.test.ts',
        templateFile: 'templates/slice.test.hbs',
      },
    ],
  });
};

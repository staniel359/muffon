import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import {
  FlatCompat
} from '@eslint/eslintrc'
import {
  fixupConfigRules
} from '@eslint/compat'
import globals from 'globals'

export default [
  pluginJs.configs.recommended,
  ...pluginVue.configs[
    'flat/recommended'
  ],
  ...fixupConfigRules(
    new FlatCompat().config(
      {
        extends: [
          'standard'
        ]
      }
    )
  ),
  {
    ignores: [
      'build/',
      'build_electron/',
      'semantic/'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        mainWindow: 'writable',
        mainView: 'writable',
        aboutWindow: 'writable',
        aboutView: 'writable',
        tray: 'writable',
        discordClient: 'writable',
        tabsPanelHeight: 'readonly',
        YT: 'readonly',
        $: 'readonly'
      }
    },
    files: [
      '**/*.js',
      '**/*.vue'
    ],
    rules: {
      'array-bracket-newline': [
        'warn',
        {
          minItems: 1
        }
      ],
      'array-element-newline': [
        'warn',
        {
          minItems: 1
        }
      ],
      'function-call-argument-newline': 'warn',
      'function-paren-newline': [
        'warn',
        {
          minItems: 1
        }
      ],
      'no-new': 'off',
      'object-curly-newline': [
        'warn',
        {
          ObjectExpression: {
            minProperties: 1
          },
          ObjectPattern: 'always',
          ImportDeclaration: 'always'
        }
      ],
      'object-property-newline': [
        'warn',
        {
          allowAllPropertiesOnSameLine: false
        }
      ],
      'vue/array-bracket-newline': [
        'warn',
        {
          minItems: 1
        }
      ],
      'vue/custom-event-name-casing': [
        'warn',
        'camelCase'
      ],
      'vue/key-spacing': 'warn',
      'vue/match-component-file-name': [
        'warn',
        {
          extensions: [
            'vue'
          ],
          shouldMatchCase: true
        }
      ],
      'vue/no-unused-properties': [
        'off',
        {
          groups: [
            'props',
            'data'
          ],
          deepData: true
        }
      ],
      'vue/no-v-html': 'off',
      'vue/object-curly-newline': [
        'warn',
        {
          minProperties: 1
        }
      ],
      'vue/object-property-newline': [
        'warn',
        {
          allowAllPropertiesOnSameLine: false
        }
      ],
      'vue/require-default-prop': 'off',
      'vue/v-on-event-hyphenation': [
        'warn',
        'always'
      ]
    }
  }
]

import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import {
  FlatCompat
} from '@eslint/eslintrc'
import {
  fixupConfigRules
} from '@eslint/compat'

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
      '**/*.mjs',
      '**/*.vue'
    ],
    rules: {
      'array-bracket-newline': [
        'error',
        {
          minItems: 1
        }
      ],
      'array-element-newline': [
        'error',
        {
          minItems: 1
        }
      ],
      'function-call-argument-newline': 'error',
      'function-paren-newline': [
        'error',
        {
          minItems: 1
        }
      ],
      'no-new': 'off',
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            minProperties: 1
          },
          ObjectPattern: 'always',
          ImportDeclaration: 'always'
        }
      ],
      'object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: false
        }
      ],
      'vue/array-bracket-newline': [
        'error',
        {
          minItems: 1
        }
      ],
      'vue/custom-event-name-casing': [
        'error',
        'camelCase'
      ],
      'vue/key-spacing': 'error',
      'vue/match-component-file-name': [
        'error',
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
        'error',
        {
          minProperties: 1
        }
      ],
      'vue/object-property-newline': [
        'error',
        {
          allowAllPropertiesOnSameLine: false
        }
      ],
      'vue/require-default-prop': 'off',
      'vue/v-on-event-hyphenation': [
        'error',
        'always'
      ]
    }
  }
]

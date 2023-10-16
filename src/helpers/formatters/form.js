import i18n from '@/plugins/i18n'
import {
  camelCase
} from 'change-case'

export function field (
  {
    id,
    dependentId,
    rules
  }
) {
  const textKey =
    camelCase(
      id
    )

  function formatRule (
    rule
  ) {
    const text =
      i18n.global.t(
        `forms.errors.${rule}.${textKey}`
      )

    return {
      type: rule,
      prompt: text
    }
  }

  const rulesFormatted =
    rules.map(
      formatRule
    )

  return {
    identifier: id,
    depends: dependentId,
    rules: rulesFormatted
  }
}

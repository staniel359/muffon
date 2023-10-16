import {
  field as formatFormField
} from '@/helpers/formatters/form'

export default function (
  {
    onSuccess
  }
) {
  const passwordResetCodeFieldData =
    formatFormField(
      {
        id: 'password-reset-code',
        rules: [
          'empty'
        ]
      }
    )

  const passwordFieldData =
    formatFormField(
      {
        id: 'password',
        rules: [
          'empty'
        ]
      }
    )

  const passwordConfirmationFieldData =
    formatFormField(
      {
        id: 'password-confirmation',
        rules: [
          'empty'
        ]
      }
    )

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      passwordResetCode:
        passwordResetCodeFieldData,
      password:
        passwordFieldData,
      passwordConfirmation:
        passwordConfirmationFieldData
    },
    onSuccess
  }
}

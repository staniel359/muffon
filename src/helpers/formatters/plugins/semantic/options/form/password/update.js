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
          'notEmpty'
        ]
      }
    )

  const passwordFieldData =
    formatFormField(
      {
        id: 'password',
        rules: [
          'notEmpty'
        ]
      }
    )

  const passwordConfirmationFieldData =
    formatFormField(
      {
        id: 'password-confirmation',
        rules: [
          'notEmpty'
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

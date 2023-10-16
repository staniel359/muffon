import {
  field as formatFormField
} from '@/helpers/formatters/form'

export default function (
  {
    onSuccess
  }
) {
  const emailFieldData =
    formatFormField(
      {
        id: 'email',
        rules: [
          'empty'
        ]
      }
    )

  const passwordFieldData = {
    identifier: 'password',
    optional: true
  }

  const passwordConfirmationFieldData =
    formatFormField(
      {
        id: 'password-confirmation',
        dependentId: 'password',
        rules: [
          'empty'
        ]
      }
    )

  const nicknameFieldData =
    formatFormField(
      {
        id: 'nickname',
        rules: [
          'empty'
        ]
      }
    )

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      email: emailFieldData,
      password: passwordFieldData,
      passwordConfirmation:
        passwordConfirmationFieldData,
      nickname: nicknameFieldData
    },
    onSuccess
  }
}

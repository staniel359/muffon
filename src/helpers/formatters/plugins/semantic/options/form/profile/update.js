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
          'notEmpty'
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
          'notEmpty'
        ]
      }
    )

  const nicknameFieldData =
    formatFormField(
      {
        id: 'nickname',
        rules: [
          'notEmpty'
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

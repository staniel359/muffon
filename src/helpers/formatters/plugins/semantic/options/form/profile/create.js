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

  const nicknameFieldData =
    formatFormField(
      {
        id: 'nickname',
        rules: [
          'empty'
        ]
      }
    )

  const legalFieldData =
    formatFormField(
      {
        id: 'legal',
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
      nickname: nicknameFieldData,
      legal: legalFieldData
    },
    onSuccess
  }
}

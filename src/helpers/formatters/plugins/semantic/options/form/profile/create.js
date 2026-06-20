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

  const nicknameFieldData =
    formatFormField(
      {
        id: 'nickname',
        rules: [
          'notEmpty'
        ]
      }
    )

  const legalFieldData =
    formatFormField(
      {
        id: 'legal',
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
      nickname: nicknameFieldData,
      legal: legalFieldData
    },
    onSuccess
  }
}

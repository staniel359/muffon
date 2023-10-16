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

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      email: emailFieldData,
      password: passwordFieldData
    },
    onSuccess
  }
}

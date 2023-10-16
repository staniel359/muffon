import {
  field as formatFormField
} from '@/helpers/formatters/form'

export default function (
  {
    onSuccess
  }
) {
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
      password:
        passwordFieldData
    },
    onSuccess
  }
}

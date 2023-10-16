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

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      email: emailFieldData
    },
    onSuccess
  }
}

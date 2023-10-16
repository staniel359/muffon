import {
  field as formatFormField
} from '@/helpers/formatters/form'

export default function (
  {
    onSuccess
  }
) {
  const titleFieldData =
    formatFormField(
      {
        id: 'title',
        rules: [
          'empty'
        ]
      }
    )

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      title: titleFieldData
    },
    onSuccess
  }
}

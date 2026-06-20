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
          'notEmpty'
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

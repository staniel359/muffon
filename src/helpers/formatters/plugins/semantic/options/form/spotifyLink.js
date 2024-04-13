import {
  field as formatFormField
} from '@/helpers/formatters/form'

export default function (
  {
    onSuccess
  }
) {
  const clientIdFieldData =
    formatFormField(
      {
        id: 'client-id',
        rules: [
          'empty'
        ]
      }
    )

  const clientSecretFieldData =
    formatFormField(
      {
        id: 'client-secret',
        rules: [
          'empty'
        ]
      }
    )

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      clientId:
        clientIdFieldData,
      clientSecret:
        clientSecretFieldData
    },
    onSuccess
  }
}

import i18n from '@/plugins/i18n'

export default function (
  {
    onSuccess
  }
) {
  const emptyEmailPrompt =
    i18n.global.t(
      'forms.errors.empty.email'
    )

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: emptyEmailPrompt
          }
        ]
      }
    },
    onSuccess
  }
}

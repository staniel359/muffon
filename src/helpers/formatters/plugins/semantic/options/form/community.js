import i18n from '@/plugins/i18n'

export default function (
  {
    onSuccess
  }
) {
  const emptyTitlePrompt =
    i18n.global.t(
      'forms.errors.empty.title'
    )

  return {
    inline: true,
    keyboardShortcuts: false,
    fields: {
      title: {
        identifier: 'title',
        rules: [
          {
            type: 'empty',
            prompt: emptyTitlePrompt
          }
        ]
      }
    },
    onSuccess
  }
}

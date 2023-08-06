import i18n from '@/plugins/i18n'

export default function (
  {
    onSuccess
  }
) {
  const emptyPasswordPrompt =
    i18n.global.t(
      'forms.errors.empty.password'
    )

  return {
    duration: 0,
    inline: true,
    fields: {
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordPrompt
          }
        ]
      }
    },
    onSuccess
  }
}

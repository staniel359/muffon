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

  const emptyPasswordConfirmationPrompt =
    i18n.global.t(
      'forms.errors.empty.passwordConfirmation'
    )

  const emptyNicknamePrompt =
    i18n.global.t(
      'forms.errors.empty.nickname'
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
      },
      password: {
        identifier: 'password',
        optional: true
      },
      passwordConfirmation: {
        identifier: 'password-confirmation',
        depends: 'password',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordConfirmationPrompt
          }
        ]
      },
      nickname: {
        identifier: 'nickname',
        rules: [
          {
            type: 'empty',
            prompt: emptyNicknamePrompt
          }
        ]
      }
    },
    onSuccess
  }
}

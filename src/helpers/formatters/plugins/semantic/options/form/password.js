import i18n from '@/plugins/i18n'

export function reset (
  {
    onSuccess
  }
) {
  const emptyEmailPrompt =
    i18n.global.t(
      'forms.errors.empty.email'
    )

  return {
    duration: 0,
    inline: true,
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

export function update (
  {
    onSuccess
  }
) {
  const emptyPasswordResetCodePrompt =
    i18n.global.t(
      'forms.errors.empty.passwordResetCode'
    )

  const emptyPasswordPrompt =
    i18n.global.t(
      'forms.errors.empty.password'
    )

  const emptyPasswordConfirmationPrompt =
    i18n.global.t(
      'forms.errors.empty.passwordConfirmation'
    )

  return {
    duration: 0,
    inline: true,
    fields: {
      passwordResetCode: {
        identifier: 'password-reset-code',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordResetCodePrompt
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordPrompt
          }
        ]
      },
      passwordConfirmation: {
        identifier: 'password-confirmation',
        rules: [
          {
            type: 'empty',
            prompt: emptyPasswordConfirmationPrompt
          }
        ]
      }
    },
    onSuccess
  }
}

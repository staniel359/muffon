import {
  deepLinksProtocol
} from '#/helpers/utils'

export default function (
  {
    link,
    args = []
  }
) {
  function isMatchedArg (
    arg
  ) {
    return arg.startsWith(
      deepLinksProtocol
    )
  }

  const argsLink =
    args.find(
      isMatchedArg
    )

  const linkConditional = (
    link || argsLink
  )

  const deepLinkRegex =
    `${deepLinksProtocol}(.+)`

  const deepLink =
    linkConditional?.match(
      deepLinkRegex
    )?.[1]

  if (deepLink) {
    mainWindow
      .webContents
      .send(
        'open-deep-link',
        {
          path: deepLink
        }
      )
  }
}

function beRu (
  choice,
  choicesLength
) {
  const isZero = (
    choice === 0
  )

  if (isZero) {
    return 0
  }

  const isTeen = (
    choice > 10 &&
      choice < 20
  )

  if (isTeen) {
    return 0
  }

  const isEndWithOne = (
    choice % 10 === 1
  )

  if (isEndWithOne) {
    return 1
  }

  const isEndWithTwoThreeFour = (
    choice % 10 >= 2 &&
      choice % 10 <= 4
  )

  if (isEndWithTwoThreeFour) {
    const isGenitive = (
      choicesLength === 2
    )

    if (isGenitive) {
      return 0
    } else {
      return 2
    }
  }

  return 0
}

module.exports = beRu

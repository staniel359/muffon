import store from '*/store'

export { v4 as generateKey } from 'uuid'

const isDevelopment =
  process.env.NODE_ENV === 'development'

export const handleEnvError = value => {
  if (isDevelopment) {
    console.log(value)
  } else {
    throw value
  }
}

export const getDistinctArray = value => {
  return [...new Set(value)]
}

export const shuffleArray = value => {
  const array = [...value]

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [array[i], array[j]] =
      [array[j], array[i]]
  }

  return array
}

export const isCurrentProfile = profileId => {
  const profileInfo =
    store.state.profile.info

  return (
    parseInt(profileId) ===
      parseInt(profileInfo.id)
  )
}

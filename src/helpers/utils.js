export { v4 as generateKey } from 'uuid'

const isDevelopment = process.env.NODE_ENV === 'development'

export function raiseProductionError (error) {
  if (!isDevelopment) {
    throw error
  }
}

export function getDistinctArray (array) {
  return [...new Set(array)]
}

export function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [array[i], array[j]] = [array[j], array[i]]
  }

  return array
}

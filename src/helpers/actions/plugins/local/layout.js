import local from '#/plugins/local'

export function setIsDarkMode (value) {
  local.set('layout.isDarkMode', value)
}

export function getIsDarkMode () {
  return local.get('layout.isDarkMode')
}

module.exports = {
  show: 'Открыть',
  hide: 'Скрыть',
  exit: 'Выйти',
  update: {
    message (
      version
    ) {
      return `Доступна версия ${version}!`
    },
    buttons: {
      download: 'Скачать',
      close: 'Закрыть'
    }
  }
}

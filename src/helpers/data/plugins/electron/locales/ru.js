module.exports = {
  show: 'Открыть',
  hide: 'Скрыть',
  exit: 'Выйти',
  update: {
    title: 'Новая версия',
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

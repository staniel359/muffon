import axios from 'axios'
import i18n from '@/plugins/i18n'

export function history (
  {
    source,
    onSelect
  }
) {
  return {
    transition: 'fade down',
    maxResults: 20,
    minCharacters: 0,
    searchDelay: 0,
    cache: false,
    showNoResults: false,
    source,
    onSelect
  }
}

export function search (
  {
    onResponse,
    url,
    fields,
    onSelect
  }
) {
  const {
    baseURL
  } = axios.defaults

  const apiSettings = {
    base: baseURL,
    onResponse,
    url
  }

  const noResultsHeader =
    i18n.global.t(
      'errors.notFound.header'
    )

  const noResults =
    i18n.global.t(
      'errors.notFound.content'
    )

  const serverError =
    i18n.global.t(
      'errors.internalServer.header'
    )

  const error = {
    noResultsHeader,
    noResults,
    serverError
  }

  return {
    transition: 'fade down',
    cache: false,
    searchOnFocus: false,
    showNoResults: true,
    maxResults: 5,
    minCharacters: 1,
    searchDelay: 500,
    apiSettings,
    error,
    fields,
    onSelect
  }
}

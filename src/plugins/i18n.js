import { createI18n } from 'vue-i18n';
import be from './i18n/locales/be.json';
import de from './i18n/locales/de.json';
import en from './i18n/locales/en.json';
import es from './i18n/locales/es.json';
import fr from './i18n/locales/fr.json';
import he from './i18n/locales/he.json';
import it from './i18n/locales/it.json';
import ja from './i18n/locales/ja.json';
import ko from './i18n/locales/ko.json';
import pl from './i18n/locales/pl.json';
<<<<<<< HEAD
<<<<<<< HEAD
import pt from './i18n/locales/pt_br.json';
=======
import pt_br from './i18n/locales/pt_br.json';
>>>>>>> 92cc902c0815ce5e669af5be50eac08148555a6c
=======
import pt_br from './i18n/locales/pt_br.json';
>>>>>>> 92cc902c0815ce5e669af5be50eac08148555a6c
import ru from './i18n/locales/ru.json';
import zh from './i18n/locales/zh.json';
import slavicPluralizationRule from './i18n/rules/pluralization/slavic.js';

// i18n

const localesData = {
  be,
  de,
  en,
  es,
  fr,
  he,
  it,
  ja,
  ko,
  pl,
<<<<<<< HEAD
<<<<<<< HEAD
  pt,
=======
  pt_br,
>>>>>>> 92cc902c0815ce5e669af5be50eac08148555a6c
=======
  pt_br,
>>>>>>> 92cc902c0815ce5e669af5be50eac08148555a6c
  ru,
  zh,
};

const pluralizationRules = {
  be: slavicPluralizationRule,
  pl: slavicPluralizationRule,
  ru: slavicPluralizationRule,
};

const i18n = createI18n({
  fallbackLocale: 'en',
  messages: localesData,
  pluralizationRules,
});

if (import.meta.hot) {
  import.meta.hot.accept('./i18n/locales/be.json', (fileImport) => {
    i18n.global.setLocaleMessage('be', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/de.json', (fileImport) => {
    i18n.global.setLocaleMessage('de', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/en.json', (fileImport) => {
    i18n.global.setLocaleMessage('en', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/es.json', (fileImport) => {
    i18n.global.setLocaleMessage('es', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/fr.json', (fileImport) => {
    i18n.global.setLocaleMessage('fr', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/he.json', (fileImport) => {
    i18n.global.setLocaleMessage('he', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/it.json', (fileImport) => {
    i18n.global.setLocaleMessage('it', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/ja.json', (fileImport) => {
    i18n.global.setLocaleMessage('ja', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/ko.json', (fileImport) => {
    i18n.global.setLocaleMessage('ko', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/pl.json', (fileImport) => {
    i18n.global.setLocaleMessage('pl', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/pt_br.json', (fileImport) => {
<<<<<<< HEAD
<<<<<<< HEAD
    i18n.global.setLocaleMessage('pt', fileImport.default);
=======
    i18n.global.setLocaleMessage('pt-BR', fileImport.default);
>>>>>>> 92cc902c0815ce5e669af5be50eac08148555a6c
=======
    i18n.global.setLocaleMessage('pt-BR', fileImport.default);
>>>>>>> 92cc902c0815ce5e669af5be50eac08148555a6c
  });

  import.meta.hot.accept('./i18n/locales/ru.json', (fileImport) => {
    i18n.global.setLocaleMessage('ru', fileImport.default);
  });

  import.meta.hot.accept('./i18n/locales/zh.json', (fileImport) => {
    i18n.global.setLocaleMessage('zh', fileImport.default);
  });
}

export default i18n;

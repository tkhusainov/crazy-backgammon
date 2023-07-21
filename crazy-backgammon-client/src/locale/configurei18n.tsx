import {use} from 'i18next';
import {initReactI18next} from 'react-i18next';

import {LanguageService} from 'services/language.service';

import {resources} from './resources';

export default () => {
    use(initReactI18next)
        .init({
            resources,
            lng: LanguageService.getLanguage(),
            fallbackLng: LanguageService.getDefaultLanguage(),
            interpolation: {
                escapeValue: false
            }
        });
};

import {use} from 'i18next';
import {initReactI18next} from 'react-i18next';

import {resources} from './resources'
import {LanguageService} from '../services/language.service';

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

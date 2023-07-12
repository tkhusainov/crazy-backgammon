import {getI18n} from 'react-i18next';

import {DEFAULT_LANGUAGE} from '../constants/language';
import {Language} from '../enums';

export class LanguageService {
    private static language: Language;

    static setLanguage(lng: Language) {
        // TODO: add validation
        if (lng && lng !== LanguageService.language) {
            LanguageService.language = lng;
            getI18n().changeLanguage(lng);
            // TODO: set to localstorage
        }
    }

    static getLanguage() {
        return LanguageService.language || DEFAULT_LANGUAGE;
    }

    static getDefaultLanguage() {
        return DEFAULT_LANGUAGE;
    }
}
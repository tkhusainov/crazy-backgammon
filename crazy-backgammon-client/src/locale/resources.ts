import flatten from 'flat';
import {transform, mergeWith} from 'lodash';

import {DEFAULT_LANGUAGE, DELIMITER} from 'constants/language';

import languages from './languages';
import {Language} from '../enums';

const mergeWithDefaultTranslations = (translations) => translations === defaultTranslations ? translations :
    mergeWith({}, defaultTranslations, translations, (objValue, srcValue) => {
        if (srcValue === '') {
            return objValue;
        }
    });

const languageTranslations = transform(languages, (acc, {name, translation}) => {
    acc[name] = flatten(translation, {delimiter: DELIMITER});
}, {} as Record<Language, object>);

const defaultTranslations = languageTranslations[DEFAULT_LANGUAGE];

export const resources = transform(languageTranslations, (acc, translations, lang) => {
    acc[lang] = {translation: mergeWithDefaultTranslations(translations)};
}, {});
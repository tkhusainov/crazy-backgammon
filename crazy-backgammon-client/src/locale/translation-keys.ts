import {flatten, unflatten} from 'flat';
import {find} from 'lodash';

import languages from './languages';
import {TranslationKeys} from './translation-keys.type';
import {DEFAULT_LANGUAGE, DELIMITER} from '../constants/language';

let TRANSLATION_KEYS = find(languages, {name: DEFAULT_LANGUAGE})?.translation as TranslationKeys;

TRANSLATION_KEYS = flatten(TRANSLATION_KEYS, {delimiter: DELIMITER});
Object.keys(TRANSLATION_KEYS).forEach((key) => (TRANSLATION_KEYS as any)[key] = key);
TRANSLATION_KEYS = unflatten(TRANSLATION_KEYS, {delimiter: DELIMITER});

export {TRANSLATION_KEYS};

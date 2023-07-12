// import {TranslationKeys} from '../translation-keys.type';
import ru from './ru.json';
import en from './en.json';
import {Language} from '../../enums';
import {DEFAULT_LANGUAGE} from '../../constants/language';
import {TranslationKeys} from '../translation-keys.type';

type DefaultLangName = typeof DEFAULT_LANGUAGE;
type NonDefaultLanguages = Exclude<Language, DefaultLangName>;
type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

type Languages = ({name: DefaultLangName, translation: TranslationKeys} |
    {name: NonDefaultLanguages, translation: RecursivePartial<TranslationKeys>})[];

const languages: Languages = [
    {name: Language.Russian, translation: ru},
    {name: Language.English, translation: en}
];

export default languages;

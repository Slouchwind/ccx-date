const { api } = require('clipcc-extension');

exports.get = {
    MenuItemPrototype: v => ({ messageId: `slouchwind.date.menu.get.${v}`, value: v }),
    DateGets: (method, value) => new Date(value)[`get${method}`]()
}

exports.set = {
    MenuItemPrototype: v => ({ messageId: `slouchwind.date.menu.set.${v}`, value: v }),
    DateSets: (method, date, value) => {
        let d = new Date(date);
        d[`set${method}`](value);
        return dateToReturnString(d);
    }
}

exports.string = {
    MenuItemPrototype: v => ({ messageId: `slouchwind.date.menu.string.${v}`, value: v }),
    DateStrings: (method, date) => new Date(date)[`to${method == 'index' ? '' : method}String`]()
}

const dateToReturnString = (d = new Date()) => {
    switch (api.getSettings('slouchwind.date.return')) {
        case 'ISO': return d.toISOString()
        case 'time': return d.getTime()
        case 'GMT': return d.toString()
    }
}
exports.dateToReturnString = dateToReturnString;

exports.dateDefualt = {
    Zero: '1970-01-01T00:00:00.000Z',
    Two: '2000-01-01T00:00:00.000Z'
}

exports.i18n = v => ({ messageId: `slouchwind.dayjs.menu.i18n.${v}`, value: v });

exports.dayjsRequire = (locales = exports.dayjsLocales) => {
    locales.forEach(v => require(`dayjs/locale/${v}`));
}

exports.dayjsLocales = [
    "af",
    "am",
    "ar-dz",
    "ar-iq",
    "ar-kw",
    "ar-ly",
    "ar-ma",
    "ar-sa",
    "ar-tn",
    "ar",
    "az",
    "be",
    "bg",
    "bi",
    "bm",
    "bn-bd",
    "bn",
    "bo",
    "br",
    "bs",
    "ca",
    "cs",
    "cv",
    "cy",
    "da",
    "de-at",
    "de-ch",
    "de",
    "dv",
    "el",
    "en-au",
    "en-ca",
    "en-gb",
    "en-ie",
    "en-il",
    "en-in",
    "en-nz",
    "en-sg",
    "en-tt",
    "en",
    "eo",
    "es-do",
    "es",
    "et",
    "eu",
    "fa",
    "fi",
    "fo",
    "fr-ca",
    "fr-ch",
    "fr",
    "fy",
    "ga",
    "gd",
    "gl",
    "gom-latn",
    "gu",
    "he",
    "hi",
    "hr",
    "ht",
    "hu",
    "hy-am",
    "id",
    "is",
    "it-ch",
    "it",
    "ja",
    "jv",
    "ka",
    "kk",
    "km",
    "kn",
    "ko",
    "ku",
    "ky",
    "lb",
    "lo",
    "lt",
    "lv",
    "me",
    "mi",
    "mk",
    "ml",
    "mn",
    "mr",
    "ms-my",
    "ms",
    "mt",
    "my",
    "nb",
    "ne",
    "nl-be",
    "nl",
    "nn",
    "oc-lnc",
    "pa-in",
    "pl",
    "pt-br",
    "pt",
    "rn",
    "ro",
    "ru",
    "rw",
    "sd",
    "se",
    "si",
    "sk",
    "sl",
    "sq",
    "sr-cyrl",
    "sr",
    "ss",
    "sv-fi",
    "sv",
    "sw",
    "ta",
    "te",
    "tet",
    "tg",
    "th",
    "tk",
    "tl-ph",
    "tlh",
    "tr",
    "tzl",
    "tzm-latn",
    "tzm",
    "ug-cn",
    "uk",
    "ur",
    "uz-latn",
    "uz",
    "vi",
    "x-pseudo",
    "yo",
    "zh-cn",
    "zh-hk",
    "zh-tw",
    "zh",
    "es-pr",
    "es-mx",
    "es-us"
];

exports.suffixMenu = v => ({ messageId: `slouchwind.dayjs.menu.suffix.${v}`, value: v });
exports.relativeMenu = v => ({ messageId: `slouchwind.dayjs.menu.relative.${v}`, value: v });
exports.addMenu = v => ({ messageId: `slouchwind.dayjs.menu.add.${v}`, value: v });
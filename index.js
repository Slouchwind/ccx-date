const { Extension, type, api } = require('clipcc-extension');
const { set, get, string, dateToReturnString, dateDefualt, i18n, dayjsRequire, dayjsLocales } = require('./method');
const dayjs = require('dayjs');
dayjsRequire(dayjsLocales, ['localizedFormat']);

var ccxDayjsLocale = 'en';

class DateExtension extends Extension {
    onInit() {
        api.addCategory({
            categoryId: 'slouchwind.date.category',
            messageId: 'slouchwind.date.category',
            color: '#56CFBF'
        });

        api.addBlock({
            opcode: 'slouchwind.date.new',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.new',
            categoryId: 'slouchwind.date.category',
            param: {
                DATE: {
                    type: type.ParameterType.STRING,
                    default: '0'
                }
            },
            function: ({ DATE }) => {
                try {
                    if (DATE == '') return dateToReturnString(new Date());
                    else if (DATE.includes(',')) {
                        var split = DATE.split(',').map(v => Number(v));
                        console.log(split);
                        return dateToReturnString(new Date(
                            split[0] || 2000,
                            split[1] || 0,
                            split[2] || 0,
                            split[3] || 0,
                            split[4] || 0,
                            split[5] || 0,
                            split[6] || 0
                        ));
                    }
                    else {
                        return dateToReturnString(new Date(DATE));
                    }
                }
                catch (e) {
                    return e.message;
                }
            }
        });

        api.addBlock({
            opcode: 'slouchwind.date.parse',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.parse',
            categoryId: 'slouchwind.date.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: dateDefualt.Zero
                }
            },
            function: ({ VALUE }) => {
                try {
                    return Date.parse(VALUE)
                }
                catch (e) {
                    return e.message;
                }
            }
        });

        api.addBlock({
            opcode: 'slouchwind.date.UTC',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.UTC',
            categoryId: 'slouchwind.date.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: '2000'
                }
            },
            function: ({ VALUE }) => {
                try {
                    var split = VALUE.split(',');
                    return Date.UTC(
                        split[0] || 2000,
                        split[1] || 0,
                        split[2] || 1,
                        split[3] || 0,
                        split[4] || 0,
                        split[5] || 0,
                        split[6] || 0
                    );
                }
                catch (e) {
                    return e.message;
                }
            }
        });

        var getMethods = ['FullYear', 'Month', 'Date', 'Day', 'Hours', 'Minutes', 'Seconds', 'Milliseconds', 'Time'];
        api.addBlock({
            opcode: 'slouchwind.date.get',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.get',
            categoryId: 'slouchwind.date.category',
            param: {
                DATE: {
                    type: type.ParameterType.STRING,
                    default: dateDefualt.Zero
                },
                METHOD: {
                    type: type.ParameterType.STRING,
                    default: getMethods[0],
                    field: true,
                    menu: getMethods.map(get.MenuItemPrototype)
                }
            },
            function: ({ DATE, METHOD }) => {
                try {
                    return get.DateGets(METHOD, DATE)
                }
                catch (e) {
                    return e.message;
                }
            }
        });

        var setMethods = ['FullYear', 'Month', 'Date', 'Hours', 'Minutes', 'Seconds', 'Milliseconds', 'Time'];
        api.addBlock({
            opcode: 'slouchwind.date.set',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.set',
            categoryId: 'slouchwind.date.category',
            param: {
                DATE: {
                    type: type.ParameterType.STRING,
                    default: dateDefualt.Zero
                },
                VALUE: {
                    type: type.ParameterType.NUMBER,
                    default: '0'
                },
                METHOD: {
                    type: type.ParameterType.STRING,
                    default: setMethods[0],
                    field: true,
                    menu: setMethods.map(set.MenuItemPrototype)
                }
            },
            function: ({ DATE, VALUE, METHOD }) => {
                try {
                    return set.DateSets(METHOD, DATE, VALUE)
                }
                catch (e) {
                    return e.message;
                }
            }
        });

        var stringMethods = ['Date', 'Time', 'index', 'Locale', 'LocaleDate', 'LocaleTime', 'ISO', 'UTC'];
        api.addBlock({
            opcode: 'slouchwind.date.string',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.string',
            categoryId: 'slouchwind.date.category',
            param: {
                DATE: {
                    type: type.ParameterType.STRING,
                    default: dateDefualt.Zero
                },
                METHOD: {
                    type: type.ParameterType.STRING,
                    default: stringMethods[0],
                    field: true,
                    menu: stringMethods.map(string.MenuItemPrototype)
                }
            },
            function: ({ DATE, METHOD }) => {
                try {
                    return string.DateStrings(METHOD, DATE)
                }
                catch (e) {
                    return e.message;
                }
            }
        });

        api.addBlock({
            opcode: 'slouchwind.date.offset',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.offset',
            categoryId: 'slouchwind.date.category',
            option: {
                monitor: true
            },
            function: _ => {
                try {
                    return new Date().getTimezoneOffset()
                }
                catch (e) {
                    return e.message;
                }
            }
        });

        api.addBlock({
            opcode: 'slouchwind.date.compare',
            type: type.BlockType.BOOLEAN,
            messageId: 'slouchwind.date.compare',
            categoryId: 'slouchwind.date.category',
            param: {
                DATE1: {
                    type: type.ParameterType.STRING,
                    default: dateDefualt.Zero
                },
                DATE2: {
                    type: type.ParameterType.STRING,
                    default: dateDefualt.Two
                },
                SYMBOL: {
                    type: type.ParameterType.STRING,
                    default: 'greater',
                    field: true,
                    menu: [
                        'greater',
                        'less',
                        'equalOrGreater',
                        'equalOrLess',
                        'equal',
                        'notEqual'
                    ]
                        .map(v => { return { messageId: `slouchwind.date.menu.compare.${v}`, value: v } })
                }
            },
            function: ({ DATE1, DATE2, SYMBOL }) => {
                try {
                    var d1 = DATE1 === '' ? new Date() : new Date(DATE1);
                    var d2 = DATE2 === '' ? new Date() : new Date(DATE2);
                    switch (SYMBOL) {
                        case 'greater': return d1 > d2;
                        case 'less': return d1 < d2;
                        case 'equalOrGreater': return d1 >= d2;
                        case 'equalOrLess': return d1 <= d2;
                        case 'equal': return d1.getTime() == d2.getTime();
                        case 'notEqual': return d1.getTime() != d2.getTime();

                        default: return false;
                    }
                } catch (e) {
                    return e.message;
                }
            }
        });

        api.addCategory({
            categoryId: 'slouchwind.dayjs.category',
            messageId: 'slouchwind.dayjs.category',
            color: '#56CFBF'
        });

        api.addBlock({
            opcode: 'slouchwind.dayjs.new',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.dayjs.new',
            categoryId: 'slouchwind.dayjs.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: '0'
                }
            },
            function: ({ VALUE }) => {
                try {
                    if (VALUE == '') return dayjs().locale(ccxDayjsLocale).toISOString()
                    else return dayjs(VALUE).locale(ccxDayjsLocale).toISOString();
                } catch (e) {
                    return e.message;
                }
            }
        });

        api.addBlock({
            opcode: 'slouchwind.dayjs.i18n',
            type: type.BlockType.COMMAND,
            messageId: 'slouchwind.dayjs.i18n',
            categoryId: 'slouchwind.dayjs.category',
            param: {
                I18N: {
                    type: type.ParameterType.STRING,
                    default: 'en',
                    menu: dayjsLocales.map(i18n)
                }
            },
            function: ({ I18N }) => {
                try {
                    ccxDayjsLocale = I18N;
                } catch (e) {
                    return e.message;
                }
            }
        });

        api.addBlock({
            opcode: 'slouchwind.dayjs.format',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.dayjs.format',
            categoryId: 'slouchwind.dayjs.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: '0'
                },
                FORMAT: {
                    type: type.ParameterType.STRING,
                    default: 'YYYY/MM/DD hh:mm:ss dddd'
                }
            },
            function: ({ VALUE, FORMAT }) => {
                try {
                    if (VALUE == '') return dayjs().locale(ccxDayjsLocale).format(FORMAT)
                    else return dayjs(VALUE).locale(ccxDayjsLocale).format(FORMAT);
                } catch (e) {
                    return e.message;
                }
            }
        });
    }

    onUninit() {
        api.removeCategory('slouchwind.date.category');
        api.removeCategory('slouchwind.dayjs.category');
    }
}

module.exports = DateExtension;
const { Extension, type, api } = require('clipcc-extension');
const { set, get, string, dateToReturnString, dateDefualt } = require("./method");

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
                    default: "0"
                }
            },
            function: ({DATE}) => {
                try {
                    if (DATE == "") return dateToReturnString(new Date());
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
            function: args => {
                try {
                    return Date.parse(new Date(args.VALUE))
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
            function: args => {
                try {
                    var split = args.VALUE.split(',');
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
            function: args => {
                try {
                    return get.DateGets(args.METHOD, args.DATE)
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
                PARAMETER: {
                    type: type.ParameterType.STRING,
                    default: setMethods[0],
                    field: true,
                    menu: setMethods.map(set.MenuItemPrototype)
                }
            },
            function: args => {
                try {
                    return set.DateSets(args.PARAMETER, args.DATE, args.VALUE)
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
                PARAMETER: {
                    type: type.ParameterType.STRING,
                    default: stringMethods[0],
                    field: true,
                    menu: stringMethods.map(string.MenuItemPrototype)
                }
            },
            function: args => {
                try {
                    return string.DateStrings(args.PARAMETER, args.DATE)
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
            function: args => {
                try {
                    var d1 = args.DATE1 === '' ? new Date() : new Date(args.DATE1);
                    var d2 = args.DATE2 === '' ? new Date() : new Date(args.DATE2);
                    switch (args.SYMBOL) {
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
    }

    onUninit() {
        api.removeCategory('slouchwind.date.category');
    }
}

module.exports = DateExtension;
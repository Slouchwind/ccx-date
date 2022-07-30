const { Extension, type, api } = require('clipcc-extension');

const get = {
    MenuItemPrototype: v => { return { messageId: `slouchwind.date.menu.get.${v}`, value: v } },
    DateGets: (method, value) => new Date(value)[`get${method}`]()
}
const set = {
    MenuItemPrototype: v => { return { messageId: `slouchwind.date.menu.set.${v}`, value: v } },
    DateSets: (method, date, value) => {
        var d = new Date(date);
        d[`set${method}`](value);
        return d.toString();
    }
}

const string = {
    MenuItemPrototype: v => { return { messageId: `slouchwind.date.menu.string.${v}`, value: v } },
    DateStrings: (method, date) => new Date(date)[`to${method == 'index' ? '' : method}String`]()
}

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
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: "0"
                }
            },
            function: args => {
                if (args.VALUE == "") return new Date().toString();
                else return new Date(args.VALUE).toString();
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
                    default: 'Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)'
                }
            },
            function: args => Date.parse(new Date(args.VALUE))
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
                var split = args.VALUE.split(",");
                return Date.UTC(split[0] || 2000, split[1] || 0, split[2] || 1, split[3] || 0, split[4] || 0, split[5] || 0, split[6] || 0);
            }
        });
        var getMethods = ['FullYear', 'Month', 'Date', 'Day', 'Hours', 'Minutes', 'Seconds', 'Milliseconds', 'Time'];
        api.addBlock({
            opcode: 'slouchwind.date.get',
            type: type.BlockType.REPORTER,
            messageId: 'slouchwind.date.get',
            categoryId: 'slouchwind.date.category',
            param: {
                VALUE: {
                    type: type.ParameterType.STRING,
                    default: 'Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)'
                },
                PARAMETER: {
                    type: type.ParameterType.STRING,
                    default: getMethods[0],
                    field: true,
                    menu: getMethods.map(get.MenuItemPrototype)
                }
            },
            function: args => get.DateGets(args.PARAMETER, args.VALUE)
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
                    default: 'Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)'
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
            function: args => set.DateSets(args.PARAMETER, args.DATE, args.VALUE)
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
                    default: 'Thu Jan 01 1970 08:00:00 GMT+0800 (中国标准时间)'
                },
                PARAMETER: {
                    type: type.ParameterType.STRING,
                    default: stringMethods[0],
                    field: true,
                    menu: stringMethods.map(string.MenuItemPrototype)
                }
            },
            function: args => string.DateStrings(args.PARAMETER, args.DATE)
        })
    }
}

module.exports = DateExtension;

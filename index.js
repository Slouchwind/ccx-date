const { Extension, type, api } = require('clipcc-extension');

class MyExtension extends Extension {
    onInit() {
        api.addCategory({
            categoryId: 'slouchwind.date.category',
            messageId: 'slouchwind.date.category',
            color: '#67c23a'
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
                if (args.VALUE == "") return new Date();
                else return new Date(args.VALUE);
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
                return Date.UTC(split[0] || 2000, split[1] || 1, split[2] || 1, split[3] || 0, split[4] || 0, split[5] || 0, split[6] || 0);
            }
        });
    }
}

module.exports = MyExtension;

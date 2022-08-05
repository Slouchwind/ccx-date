const { api } = require("clipcc-extension");

exports.get = {
    MenuItemPrototype: v => { return { messageId: `slouchwind.date.menu.get.${v}`, value: v } },
    DateGets: (method, value) => new Date(value)[`get${method}`]()
}

exports.set = {
    MenuItemPrototype: v => { return { messageId: `slouchwind.date.menu.set.${v}`, value: v } },
    DateSets: (method, date, value) => {
        var d = new Date(date);
        d[`set${method}`](value);
        return dateToReturnString(d);
    }
}

exports.string = {
    MenuItemPrototype: v => { return { messageId: `slouchwind.date.menu.string.${v}`, value: v } },
    DateStrings: (method, date) => new Date(date)[`to${method == 'index' ? '' : method}String`]()
}

function dateToReturnString(d = new Date()) {
    switch (api.getSettings("slouchwind.date.return")) {
        case "ISO": return d.toISOString()
        case "time": return d.getTime()
        case "GMT": return d.toString()
    }
}
exports.dateToReturnString = dateToReturnString

exports.dateDefualt = {
    Zero: '1970-01-01T00:00:00.000Z',
    Two: '2000-01-01T00:00:00.000Z'
}
var VALUE = [
    0,
    1,
    "0",
    "1",
    "2",
    NaN,
    Infinity,
    -Infinity,
    null,
    undefined,
    {},
    {},
    [],
    [],
    [0, 1, 2],
    {
        vegetable: "asparagus",
        meat: "steak"
    },
    console,
    console.log,
    document,
    document.write,
    true,
    false
]

var TYPE_TABLE_COLUMNS = [
    {
        name: "Value",
        generator: stringValue
    },
    {
        name: "Type",
        generator: typeStringValue
    },
    {
        name: "Boolean (value)",
        generator: function (value) { return Boolean(value); }
    },
    {
        name: "value == true",
        generator: function (value) { return value == true; }
    }
]

// JSON = JavaScript Object Notation
function stringValue(value) {
    if (typeof value === 'number' && isNaN(value)) {
        return "NaN";
    } else if (value === Infinity) {
        return "Infinity";
    } else if (value === -Infinity) {
        return "-Infinity";
    } else if (value === console) {
        return "console";
    } else if (value === document) {
        return "document";
    } else if (typeof value === "function") {
        return value.name + "()";
    } else {
        return JSON.stringify(value);
    }
}

function typeStringValue(value) {
    if (value === null) {
        return "object";
    } else if (typeof value === 'object' && value.constructor.name === 'Object') {
        return "object";
    } else if (typeof value === 'object') {
        return "object of type " + value.constructor.name;
    } else {
        return typeof value;
    }
}

function generateTypeHeader() {
    var result = "<tr>\r\n"
    for (var counter = 0; counter < TYPE_TABLE_COLUMNS.length; counter++) {
        result += "<th>" + TYPE_TABLE_COLUMNS[counter].name + "</th>\r\n";
    }
    result += "</tr>\r\n";
    return result;
}


function generateTypeRow(value) {
    var result = "<tr>\r\n";
    for (var counter = 0; counter < TYPE_TABLE_COLUMNS.length; counter++) {
        result += "<td>" + TYPE_TABLE_COLUMNS[counter].generator(value) + "</td>\r\n";
    }
    result += "</tr>\r\n";
    return result;
}

function generateTypeTable() {
    let table = "<table>\r\n";
    table += "  " + generateTypeHeader();
    for (var counter = 0; counter < VALUE.length; counter++) {
        table += generateTypeRow(VALUE[counter])
    }
    table += "</table>\r\n";
    return table;
}

function init() {
    document.getElementById('typeTable').innerHTML = generateTypeTable();
}

window.addEventListener('load', init);
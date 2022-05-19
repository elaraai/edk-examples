// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

const array_struct_type = ELARA.StructType({
    string: 'string',
    date: 'datetime',
    number: 'float',
    integer: 'integer',
    'boolean': 'boolean',
});
const array_number_array_type = ELARA.ArrayType('float');
const array_struct_array_type = ELARA.ArrayType(ELARA.StructType({
    string: 'string',
    date: 'datetime',
    number: 'float',
    integer: 'integer',
    'boolean': 'boolean',
}));


export default ELARA.ArraySourceSchema({
    name: "Array",
    rows: [{
        string: "string",
        date: "2021-01-04T00:02:24.961Z",
        number: 3.25,
        integer: 651326123216651n,
        'boolean': true,
        'Another String': "string",
        set: [
            "set-element",
            "set-element2",
        ],
        struct: {

            string: "mtsqttl4s5",
            date: "2021-04-01T03:03:09.834Z",
            number: -7903.29,
            integer: -8745n,
            'boolean': false,
        },
        'number array': [
            2.3,
            1.5,
            5.6,
        ],
        'struct array': [
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -4875n,
                'boolean': false,
            },
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -8575n,
                'boolean': false,
            },
        ],
    }, {
        string: "string1",
        date: "2021-01-04T00:02:24.961Z",
        number: 3.25,
        integer: 65132613216651n,
        'boolean': true,
        'Another String': "string",
        set: [
            "set-element",
            "set-element2",
        ],
        struct: {

            string: "mtsqttl4s5",
            date: "2021-04-01T03:03:09.834Z",
            number: -790.29,
            integer: -8785n,
            'boolean': false,
        },
        'number array': [
            2.3,
            1.5,
            5.6,
        ],
        'struct array': [
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -1875n,
                'boolean': false,
            },
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -875n,
                'boolean': false,
            },
        ],
    },],
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.Variable("string", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        number: ELARA.Parse(ELARA.Variable("number", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        'Another String': ELARA.Parse(ELARA.Variable("Another String", 'string')),
        set: ELARA.Parse(ELARA.Variable("set", 'set')),
        struct: ELARA.Parse(ELARA.Variable("struct", array_struct_type)),
        'number array': ELARA.Parse(ELARA.Variable("number array", array_number_array_type)),
        'struct array': ELARA.Parse(ELARA.Variable("struct array", array_struct_array_type)),
    },
})

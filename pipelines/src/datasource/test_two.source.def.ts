// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

const test_two_struct_type = ELARA.StructType({
    string: 'string',
    date: 'datetime',
    number: 'float',
    integer: 'integer',
    'boolean': 'boolean',
    struct: ELARA.StructType({
        string: 'string',
        date: 'datetime',
        number: 'float',
        integer: 'integer',
        'boolean': 'boolean',
    }),
    array: 'set',
});


export default ELARA.JsonSourceSchema({
    name: "Test Two",
    uri: ELARA.FileURI({
        path: ELARA.Const("files/test_two.jsonl"),
    }),
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.Variable("string", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        number: ELARA.Parse(ELARA.Variable("number", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        array: ELARA.Parse(ELARA.Variable("array", 'set')),
        Dict: ELARA.Parse(ELARA.Variable("Dict", ELARA.DictType('float'))),
        struct: ELARA.Parse(ELARA.Variable("struct", test_two_struct_type)),
    },
})

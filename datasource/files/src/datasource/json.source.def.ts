// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

const json_struct_type = ELARA.StructType({
    string: 'string',
    date: 'datetime',
    "float": 'float',
    integer: 'integer',
    "boolean": 'boolean',
    struct: ELARA.StructType({
        string: 'string',
        date: 'datetime',
        "float": 'float',
        integer: 'integer',
        "boolean": 'boolean',
    }),
    array: 'set',
});


export default ELARA.JsonSourceSchema({
    name: "Json",
    uri: 'file://files/test.jsonl',
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.Variable("string", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        "float": ELARA.Parse(ELARA.Variable("float", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        "boolean": ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        array: ELARA.Parse(ELARA.Variable("array", 'set')),
        struct: ELARA.Parse(ELARA.Variable("struct", json_struct_type)),
    },
})

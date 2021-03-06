// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Csv Two",
    uri: 'file://files/test_two.csv',
    primary_key: ELARA.Print(ELARA.Variable("index", 'integer')),
    index_variable: ELARA.Variable("index", 'integer'),
    selections: {
        string: ELARA.Parse(ELARA.IfElse(
            ELARA.Equal(ELARA.Variable("string", 'string'), ELARA.Const("?")),
            ELARA.Null('string'),
            ELARA.Variable("string", 'string')
        )),
        number: ELARA.Parse(ELARA.Variable("number", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        "boolean": ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        "Another String": ELARA.Parse(ELARA.IfElse(
            ELARA.Equal(ELARA.Variable("Another String", 'string'), ELARA.Const("?")),
            ELARA.Null('string'),
            ELARA.Variable("Another String", 'string')
        )),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
    },
})

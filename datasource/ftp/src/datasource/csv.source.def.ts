// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Csv",
    uri: 'ftp://__user__:__password__@localhost/test.csv',
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.IfElse(
            ELARA.Equal(ELARA.Variable("string", 'string'), ELARA.Const("?")),
            ELARA.Null('string'),
            ELARA.Variable("string", 'string')
        )),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        'float': ELARA.Parse(ELARA.Variable("float", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        'Another String': ELARA.Parse(ELARA.IfElse(
            ELARA.Equal(ELARA.Variable("Another String", 'string'), ELARA.Const("?")),
            ELARA.Null('string'),
            ELARA.Variable("Another String", 'string')
        )),
    },
})

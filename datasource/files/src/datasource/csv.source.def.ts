// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Csv",
    uri: 'file://files/test.csv',
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.Variable("string", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        "float": ELARA.Parse(ELARA.Variable("float", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        "boolean": ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        "Another String": ELARA.Parse(ELARA.Variable("Another String", 'string')),
    },
})

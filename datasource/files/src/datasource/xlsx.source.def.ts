// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.ExcelSourceSchema({
    name: "Xlsx",
    uri: 'file://files/test.xlsx',
    worksheets: {
        test: {
            primary_key: ELARA.Variable("string", 'string'),
            selections: {
                string: ELARA.Parse(ELARA.Variable("string", 'string')),
                date: ELARA.Parse(ELARA.Variable("date", 'string')),
                number: ELARA.Parse(ELARA.Variable("number", 'float')),
                integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
                "boolean": ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
            },
        },
        Sheet1: {
            primary_key: ELARA.Variable("string", 'string'),
            selections: {
                string: ELARA.Parse(ELARA.Variable("string", 'string')),
                date: ELARA.Parse(ELARA.Variable("date", 'string')),
                number: ELARA.Parse(ELARA.Variable("number", 'float')),
                integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
                "boolean": ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
            },
        },
        "Another Sheet$&": {
            primary_key: ELARA.Variable("another string", 'string'),
            selections: {
                "another string": ELARA.Parse(ELARA.Variable("another string", 'string')),
                "another date": ELARA.Parse(ELARA.Variable("another date", 'string')),
                "another number": ELARA.Parse(ELARA.Variable("another number", 'float')),
                "another integer": ELARA.Parse(ELARA.Variable("another integer", 'integer')),
                "another boolean": ELARA.Parse(ELARA.Variable("another boolean", 'boolean')),
            },
        },
    }
})

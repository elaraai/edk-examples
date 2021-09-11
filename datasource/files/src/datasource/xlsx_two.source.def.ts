// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.ExcelSourceSchema({
    name: "Xlsx Two",
    uri: 'file://files/test_two.xlsx',
    worksheets: {
        test: {
            primary_key: ELARA.Print(ELARA.Variable("index", 'integer')),
            index_variable: ELARA.Variable("index", 'integer'),
            selections: {
                string: ELARA.Parse(ELARA.Variable("string", 'string')),
                date: ELARA.Parse(ELARA.Variable("date", 'string')),
                number: ELARA.Parse(ELARA.Variable("number", 'float')),
                integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
                'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
            },
        },
        Sheet1: {
            primary_key: ELARA.Print(ELARA.Variable("index", 'integer')),
            index_variable: ELARA.Variable("index", 'integer'),
            selections: {
                string: ELARA.Parse(ELARA.Variable("string", 'string')),
                date: ELARA.Parse(ELARA.Variable("date", 'string')),
                number: ELARA.Parse(ELARA.Variable("number", 'float')),
                integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
                'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
            },
        },
        'Another Sheet$&': {
            primary_key: ELARA.Print(ELARA.Variable("index", 'integer')),
            index_variable: ELARA.Variable("index", 'integer'),
            selections: {
                'another string': ELARA.Parse(ELARA.Variable("another string", 'string')),
                'another date': ELARA.Parse(ELARA.Variable("another date", 'string')),
                'another number': ELARA.Parse(ELARA.Variable("another number", 'float')),
                'another integer': ELARA.Parse(ELARA.Variable("another integer", 'integer')),
                'another boolean': ELARA.Parse(ELARA.Variable("another boolean", 'boolean')),
            },
        },
    }
})

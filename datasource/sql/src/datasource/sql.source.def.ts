// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"
import { SqlSourceCsv, SqlSourceQuery } from "@elaraai/edk/lib"


export default ELARA.SqlSourceSchema({
    name: "SQL",
    connection: 'mssql://localhost//DataSourceTest',
    username: ELARA.Const("elara"),
    password: ELARA.Const("2sXRkybHEGY8mrnF"),
    poll: ELARA.Poll({
        value: 0.5,
        unit: 'second',
        datetime: ELARA.Variable("tick", 'datetime'),
        prev_datetime: ELARA.Variable("prev_tick", 'datetime'),
    }),
    outputs: {
        TestTable: SqlSourceQuery({
            query: ELARA.Const("SELECT * FROM dbo.TestTable"),
            primary_key: ELARA.Variable("a string", 'string'),
            filter: ELARA.Const(true),
            selections: {
                'a string': ELARA.Parse(ELARA.Variable("a string", 'string')),
                'a date': ELARA.Parse(ELARA.Variable("a date", 'datetime')),
                'a number': ELARA.Parse(ELARA.Variable("a number", 'float')),
                'a integer': ELARA.Parse(ELARA.Variable("a integer", 'integer')),
                'a boolean': ELARA.Parse(ELARA.Variable("a boolean", 'boolean')),
                'Another String': ELARA.Parse(ELARA.Variable("Another String", 'string')),
            },
        }),
        TestTableFile: SqlSourceCsv({
            uri: "file://files/TestTable.csv",
            primary_key: ELARA.Variable("a string", 'string'),
            filter: ELARA.Const(true),
            delimiter: '|',
            selections: {
                'a string': ELARA.Parse(ELARA.Variable("a string", 'string')),
                'a date': ELARA.Parse(ELARA.Variable("a date", 'datetime')),
                'a number': ELARA.Parse(ELARA.Variable("a number", 'float')),
                'a integer': ELARA.Parse(ELARA.Variable("a integer", 'integer')),
                'a boolean': ELARA.Parse(ELARA.Variable("a boolean", 'boolean')),
                'Another String': ELARA.Parse(ELARA.Variable("Another String", 'string')),
            },
        }),
        AnotherTestTable: SqlSourceQuery({
            query: ELARA.Const("SELECT * FROM dbo.AnotherTestTable"),
            primary_key: ELARA.Variable("another string", 'string'),
            filter: ELARA.Const(true),
            selections: {
                'another string': ELARA.Parse(ELARA.Variable("another string", 'string')),
                'another date': ELARA.Parse(ELARA.Variable("another date", 'datetime')),
                'another number': ELARA.Parse(ELARA.Variable("another number", 'float')),
                'another integer': ELARA.Parse(ELARA.Variable("another integer", 'integer')),
                'another boolean': ELARA.Parse(ELARA.Variable("another boolean", 'boolean')),
                'Yet Another String': ELARA.Parse(ELARA.Variable("Yet Another String", 'string')),
            },
        }),
        TestView: SqlSourceQuery({
            query: ELARA.Const("SELECT * FROM dbo.TestView"),
            primary_key: ELARA.StringJoin([
                ELARA.Variable("a string", 'string'),
                ELARA.Print(ELARA.Variable("a date", 'datetime')),
                ELARA.Print(ELARA.Variable("a number", 'float')),
                ELARA.Print(ELARA.Variable("a integer", 'integer')),
                ELARA.Print(ELARA.Variable("a boolean", 'boolean')),
                ELARA.Variable("Another String", 'string'),
            ], ""),
            filter: ELARA.Const(true),
            selections: {
                'a string': ELARA.Parse(ELARA.Variable("a string", 'string')),
                'a date': ELARA.Parse(ELARA.Variable("a date", 'datetime')),
                'a number': ELARA.Parse(ELARA.Variable("a number", 'float')),
                'a integer': ELARA.Parse(ELARA.Variable("a integer", 'integer')),
                'a boolean': ELARA.Parse(ELARA.Variable("a boolean", 'boolean')),
                'Another String': ELARA.Parse(ELARA.Variable("Another String", 'string')),
            },
        }),
        AnotherTestView: SqlSourceQuery({
            query: ELARA.Const("SELECT * FROM dbo.AnotherTestView"),
            primary_key: ELARA.StringJoin([
                ELARA.Variable("another string", 'string'),
                ELARA.Print(ELARA.Variable("another date", 'datetime')),
                ELARA.Print(ELARA.Variable("another number", 'float')),
                ELARA.Print(ELARA.Variable("another integer", 'integer')),
                ELARA.Print(ELARA.Variable("another boolean", 'boolean')),
                ELARA.Variable("Yet Another String", 'string'),
            ], ""),
            filter: ELARA.Const(true),
            selections: {
                'another string': ELARA.Parse(ELARA.Variable("another string", 'string')),
                'another date': ELARA.Parse(ELARA.Variable("another date", 'datetime')),
                'another number': ELARA.Parse(ELARA.Variable("another number", 'float')),
                'another integer': ELARA.Parse(ELARA.Variable("another integer", 'integer')),
                'another boolean': ELARA.Parse(ELARA.Variable("another boolean", 'boolean')),
                'Yet Another String': ELARA.Parse(ELARA.Variable("Yet Another String", 'string')),
            },
        }),
    }
})

# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to create various file type data sources.

# Usage

The solution can be built using the following command ```edk build```. Prior to using the example the relevant database should be configured lcoally using the `scripts/setup.sql` script.

# Implementation
The project will involve creating some an sql datasource, detecting it's outputs, then visualising the outputs.

## Adding datasource
An sql data source was added with the following EDK command ```edk add datasource sql --name Sql --name='SQL' --server localhost --database DataSourceTest --username elara --password wXP5cJnTjJzk4Ta3 --def_dir src/datasource```.

This will create an empty datasource for the database:

```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.SqlSourceSchema({
    name: "SQL",
    server: ELARA.Const("localhost"),
    database: ELARA.Const("DataSourceTest"),
    username: ELARA.Const("elara"),
    password: ELARA.Const("2sXRkybHEGY8mrnF"),
})
```

## Detecting datasource
The output expressions were detected for the datasource with the following command ```edk detect sql --asset sql.source```.

This generated the types and expressions for the datasource:

```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.SqlSourceSchema({
    name: "SQL",
    connection: MsSqlURI({
        server: ELARA.Const("localhost"),
        database: ELARA.Const("DataSourceTest"),
    }),
    username: ELARA.Const("elara"),
    password: ELARA.Const("2sXRkybHEGY8mrnF"),
    queries: {
        TestTable: {
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
        },
        AnotherTestTable: {
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
        },
        TestView: {
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
        },
        AnotherTestView: {
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
        },
    }
})
```

## Adding a file table
We can also generate an SQL output from a file, in the case that there is an export we want to test. We will add the file in `files/TestTable.csv` exported from the database with the following:


```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.SqlSourceSchema({
    name: "SQL",
    // ...
    outputs: {
        // ...
        TestTableFile: SqlSourceCsv({
            uri: "file://files/TestTable.csv",
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
        // ...
    }
    // ...
})
```

## Add polling
In order to allow the datasource to respond to changes, we can configure polling to requery for changes every half second.

```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.SqlSourceSchema({
    name: "SQL",
    // ...
    poll: ELARA.Poll({
        value: 0.5,
        unit: 'second',
        datetime: ELARA.Variable("tick", 'datetime'),
        prev_datetime: ELARA.Variable("prev_tick", 'datetime'),
    }),
    // ...
})
```
Note that even though the datasource will query every half-second, changes will only propogate from the dataosurce into ELARA if there is a change in the data.

## Add application
The application was added for the project with the following command: ```edk add plugin --name Application --def_dir src/plugin```. The application contents was added to display the datasource outputs with the ```DataSourcePlugin``` for a default ```SuperUser```:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, DataSourcePlugin, SuperUser } from "@elaraai/edk/lib"

import sql from "../../gen/sql.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "SQL Datasource",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [sql]
            })
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ]
    })
)

```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI reference](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API reference](https://elaraai.github.io/docs/api): programmatic api for the cli functionality
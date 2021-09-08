# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to create various file type data sources.

# Usage

Run `npm install` to install the package dependencies.

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating some file based datasources, detecting their outputs, then visualising the outputs.

## Adding datasources
Each data source was added with the following EDK commands:

- csv: ```edk add datasource csv --name Csv --uri file://files/test.csv --def_dir src/datasource```
- json: ```edk add datasource json --name Json --uri file://files/test.json --def_dir src/datasource```
- xlsx: ```edk add datasource xlsx --name Xlsx --uri file://files/test.xlsx --def_dir src/datasource```
- csv two: ```edk add datasource csv --name "Csv Two" --uri file://files/test_two.csv --def_dir src/datasource```
- xlsx two: ```edk add datasource xlsx --name "Xlsx Two" --uri file://files/test_two.xlsx --def_dir src/datasource```

This will create an empty datasource for each file, for example for the json datasource:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.JsonSourceSchema({
    name: "Json",
    uri: 'file://files/test.json,
})
```

Note that the second version of each file (and datasource) are intentionally more complicated, containing duplicate rows (i.e. no unique key) and a much larger number of rows. Also, for `test.csv` dataset we know that rather than empty cells for variables, the file contains a `"?"` string.

## Detecting datasources
The output expressions were detected for each data with the following commands.
- csv: ```edk detect csv --asset csv.source --defaults --empty ?```
- json: ```edk detect json --asset json.source --defaults```
- xlsx: ```edk detect xlsx --asset xlsx.source --defaults```
- csv two: ```edk detect csv --asset csv_two.source --defaults --empty ?```
- xlsx two: ```edk detect xlsx --asset xlsx_two.source --defaults```

This will generate the types and expressions for the datasources, for example for ```json.source```:

```typescript
import * as ELARA from "@elaraai/edk/lib"

const json_struct_type = ELARA.StructType({
    string: 'string',
    date: 'datetime',
    'float': 'float',
    integer: 'integer',
    'boolean': 'boolean',
    struct: ELARA.StructType({
        string: 'string',
        date: 'datetime',
        'float': 'float',
        integer: 'integer',
        'boolean': 'boolean',
    }),
    array: 'set',
});

export default ELARA.JsonSourceSchema({
    name: "Json",
    uri: ELARA.FileURI({
        path: ELARA.Const("files/test.jsonl"),
    }),
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.Variable("string", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        'float': ELARA.Parse(ELARA.Variable("float", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        array: ELARA.Parse(ELARA.Variable("array", 'set')),
        struct: ELARA.Parse(ELARA.Variable("struct", json_struct_type)),
    },
})
```
Or alternatively for the second set of datasources, the detection will sample from the full set of rwos for efficiency, and also inject an index variable given the lack of a unique field. For example with the `csv_two.source` below.

```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.CsvSourceSchema({
    name: "Csv Two",
    uri: ELARA.FileURI({
        path: ELARA.Const("files/test_two.csv"),
    }),
    primary_key: ELARA.Print(ELARA.Variable("index", 'integer')),
    index_variable: ELARA.Variable("index", 'integer'),
    selections: {
        string: ELARA.Parse(ELARA.IfElse(
            ELARA.Equal(ELARA.Variable("string", 'string'), ELARA.Const("?")),
            ELARA.Null('string'),
            ELARA.Variable("string", 'string')
        )),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        number: ELARA.Parse(ELARA.Variable("number", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        'Another String': ELARA.Parse(ELARA.IfElse(
            ELARA.Equal(ELARA.Variable("Another String", 'string'), ELARA.Const("?")),
            ELARA.Null('string'),
            ELARA.Variable("Another String", 'string')
        )),
    },
})
```

## Add application
The application was added for the project with the following command: ```edk add plugin --name Application --def_dir src/plugin```. The application contents was added to display the datasource outputs with the ```DataSourcePlugin``` for a default ```SuperUser```:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, DataSourcePlugin, SuperUser } from "@elaraai/edk/lib"

import csv from "../../gen/csv.source"
import csv_two from "../../gen/csv_two.source"
import json from "../../gen/json.source"
import xlsx from "../../gen/xlsx.source"
import xlsx_two from "../../gen/xlsx_two.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "File Datasources",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [csv, json, xlsx, csv_two, xlsx_two]
            })
        },
        users: [
            SuperUser({
                email: 'admin@domain.com',
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
# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to create various procedural data sources.

# Usage

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating some procedural datasources, detecting their outputs, then visualising the outputs.

## Adding datasources
Each data source was added with the following EDK commands:

- array: ```edk add datasource array --name='Array' --def_dir src/datasource```
- range: ```edk add datasource range --name='Range' --start=1 --stop=10 --step=2 --def_dir src/datasource```
- clock: ```edk add datasource clock --name='Clock' --period=1 --unit='day' --past_cycles=2 --future_cycles=2  --def_dir src/datasource```

This will create an empty datasource for each file, for example for the array datasource:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.ArraySourceSchema({
    name: "Array",
    rows: []
})
```

## Adding row data
We can now add some data to the array datasource for detection:


```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.ArraySourceSchema({
    name: "Array",
    rows: [{
        string: "string",
        date: "2021-01-04T00:02:24.961Z",
        number: 3.25,
        integer: 651326123216651n,
        'boolean': true,
        'Another String': "string",
        set: [
            "set-element",
            "set-element2",
        ],
        struct: {

            string: "mtsqttl4s5",
            date: "2021-04-01T03:03:09.834Z",
            number: -7903.29,
            integer: -8745n,
            'boolean': false,
        },
        'number array': [
            2.3,
            1.5,
            5.6,
        ],
        'struct array': [
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -4875n,
                'boolean': false,
            },
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -8575n,
                'boolean': false,
            },
        ],
    }, {
        string: "string1",
        date: "2021-01-04T00:02:24.961Z",
        number: 3.25,
        integer: 65132613216651n,
        'boolean': true,
        'Another String': "string",
        set: [
            "set-element",
            "set-element2",
        ],
        struct: {

            string: "mtsqttl4s5",
            date: "2021-04-01T03:03:09.834Z",
            number: -790.29,
            integer: -8785n,
            'boolean': false,
        },
        'number array': [
            2.3,
            1.5,
            5.6,
        ],
        'struct array': [
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -1875n,
                'boolean': false,
            },
            {

                string: "mtsqttl4s5",
                date: "2021-04-01T03:03:09.834Z",
                number: -790.29,
                integer: -875n,
                'boolean': false,
            },
        ],
    }]
})


```


## Detecting datasources
The output can be detected for the array source, there is no need to do this for the clock and range though:
- array: ```edk detect array --asset array.source```

This will generate the types and expressions for the array datasource:

```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

const array_struct_type = ELARA.StructType({
    string: 'string',
    date: 'datetime',
    number: 'float',
    integer: 'integer',
    'boolean': 'boolean',
});
const array_number_array_type = ELARA.ArrayType('float');
const array_struct_array_type = ELARA.ArrayType(ELARA.StructType({
    string: 'string',
    date: 'datetime',
    number: 'float',
    integer: 'integer',
    'boolean': 'boolean',
}));


export default ELARA.ArraySourceSchema({
    name: "Array",
    rows: [
        // ...
    ],
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.Variable("string", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        number: ELARA.Parse(ELARA.Variable("number", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        'Another String': ELARA.Parse(ELARA.Variable("Another String", 'string')),
        set: ELARA.Parse(ELARA.Variable("set", 'set')),
        struct: ELARA.Parse(ELARA.Variable("struct", array_struct_type)),
        'number array': ELARA.Parse(ELARA.Variable("number array", array_number_array_type)),
        'struct array': ELARA.Parse(ELARA.Variable("struct array", array_struct_array_type)),
    },
})
```

## Add application
The application was added for the project with the following command: ```edk add plugin --name Application --def_dir src/plugin```. The application contents was added to display the datasource outputs with the ```DataSourcePlugin``` for a default ```SuperUser```:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, DataSourcePlugin, SuperUser } from "@elaraai/edk/lib"

import array from "../../gen/array.source"
import clock from "../../gen/clock.source"
import range from "../../gen/range.source"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Procedural Datasources",
        schemas: {
            "Datasources": DataSourcePlugin({
                datasources: [array, clock, range]
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
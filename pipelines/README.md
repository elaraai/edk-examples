# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to create various pipeline operations.

## Usage

Run `npm install` to install the package dependencies.

Run `edk build` to create the `schema.json`.


# Implementation
The project will involve creating a pipeline for each pipeline operation, then visualising the outputs.

## Adding datasources
In order to have some data to apply in the pipelines, we will first add some json datasources:

- ```edk add datasource json --name "Test One" --uri file://files/test_one.json --def_dir src/datasource```
- ```edk add datasource json --name "Test Two" --uri file://files/test_two.json --def_dir src/datasource```

This will create two empty datasources, we can populate the output expressions 

- ```edk-io detect json --asset test_one.source --defaults```
- ```edk-io detect json --asset test_two.source --defaults```

The generates datasources will contain some complex nested data so we can exercise a broad range of Expressions, as described for `test_one.source`:

```typescript
import * as ELARA from "@elaraai/edk/lib"

const test_one_struct_type = ELARA.StructType({
    string: 'string',
    date: 'datetime',
    number: 'float',
    integer: 'integer',
    'boolean': 'boolean',
    struct: ELARA.StructType({
        string: 'string',
        date: 'datetime',
        number: 'float',
        integer: 'integer',
        'boolean': 'boolean',
    }),
    array: 'set',
});

export default ELARA.JsonSourceSchema({
    name: "Test One",
    uri: "file://files/test_one.jsonl",
    primary_key: ELARA.Variable("string", 'string'),
    selections: {
        string: ELARA.Parse(ELARA.Variable("string", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        number: ELARA.Parse(ELARA.Variable("number", 'float')),
        integer: ELARA.Parse(ELARA.Variable("integer", 'integer')),
        'boolean': ELARA.Parse(ELARA.Variable("boolean", 'boolean')),
        array: ELARA.Parse(ELARA.Variable("array", 'set')),
        Dict: ELARA.Parse(ELARA.Variable("Dict", ELARA.DictType('float'))),
        struct: ELARA.Parse(ELARA.Variable("struct", test_one_struct_type)),
    },
})
```

## Adding pipelines
Now we can add some piplines, which were added with the following EDK commands:
- select: ```edk add pipeline --name Select --def_dir src/datasource```
- filter: ```edk add pipeline --name Filter --def_dir src/datasource```
- aggregation: ```edk add pipeline --name Aggregate --def_dir src/datasource```
- disaggregate: ```edk add pipeline --name "Disaggregate Dict" --def_dir src/datasource```
- join: ```edk add pipeline --name Join --def_dir src/datasource```
- http: ```edk add pipeline --name Http --def_dir src/datasource```

This will create an empty datasource for each operation, for example for the aggregation pipeline:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.PipelineSchema({
    name: 'Aggregate',
    input_table: null,
    operations: [],
})
```

In the next steps we will add an input table and operation to each pipeline.

### Adding select operation
The select operation allows us to select output expressions from input expressions, in this case we will create some new variables from `test_one.source`:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Multiply, SelectOperation, StringJoin, Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Select',
    input_table: test_one.output,
    operations: [
        SelectOperation({
            // dont keep all the input expressions, only output the new ones
            keep_all: false,
            // the new expressions to create
            selections: {
                // output the `number` value multiplied by 2.
                multiply: Multiply(test_one.output.fields.number, 2),
                // combine several fields incluing a formatted date into a single string
                'String Join': StringJoin`${test_one.output.fields.string}.${ELARA.Print(test_one.output.fields.date, 'DD/MM/YYYY')}`
            },
            // use the `String Join` value as the output key expression
            primary_key: Variable('String Join', 'string')
        })
    ],
})
```

### Adding filter operation
The filter operation allows you to filter an input by a predicate expression:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Greater } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Filter',
    input_table: test_one.output,
    operations: [
        ELARA.FilterOperation({
            predicate: Greater(test_one.output.fields.number, 10)
        })
    ],
})
```

### Adding aggregate operation
The aggregation operation allows you to aggregate (or group) a Table Row into fewer Row's based on one or more Expressions. We can use `test_one.source` to group the by the combination of the `integer` and `string` fields since `group_value` can be any string `Expression` of the input table. For each group we can calculate a range of values:

```typescript
import * as ELARA from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Aggregate',
    input_table: test_one.output,
    operations: [
        ELARA.AggregateOperation({
            // Create a variable to place the groiup values into
            group_field: ELARA.Variable("Aggregate.Group", 'string'),
            // Group by the unique combinations of `integer` and `string`
            group_value: ELARA.StringJoin`${test_one.output.fields.integer}.${test_one.output.fields.string}`,
            aggregations: {
                // Count the number of rows where of `number` is not null.
                count: ELARA.Count(test_one.output.fields.number),
                // Count the number of distinct, non-null values of `string`
                distinctcount: ELARA.DistinctCount(test_one.output.fields.string),
                // Count the number of distinct, non-null values of a the combination of `integer` and `string`.
                unique: ELARA.Unique(ELARA.StringJoin`${test_one.output.fields.integer}.${test_one.output.fields.string}`),
                // Find the sum of the non-null values of `number`.
                sum: ELARA.Sum(test_one.output.fields.number),
                // Find the mean of the non-null values of `number`.
                mean: ELARA.Mean(test_one.output.fields.number),
                // Fnd the standard deviation of the non-null values of `number`.
                stddev: ELARA.StdDev(test_one.output.fields.number),
                //  return true if one or more value of `boolean` is true.
                some: ELARA.Some(test_one.output.fields.boolean),
                //  return true if all values of `boolean` is true.
                every: ELARA.Every(test_one.output.fields.boolean),
                // Find the mean of the non-null values of `number`.
                mode: ELARA.Mode(test_one.output.fields.number),
                // Find the median of the non-null values of `number`.
                median: ELARA.Median(test_one.output.fields.number),
                // Find the minimum of the non-null values of `number`.
                minimum: ELARA.Minimum(test_one.output.fields.number),
                // Find the maximum of the non-null values of `number`.
                maximum: ELARA.Maximum(test_one.output.fields.number),
                // Find the difference between the largest and smallest non-null values of `number`.
                span: ELARA.Span(test_one.output.fields.number),
                // Return the `string` value for the record with the minimum value for `number`.
                findminimum: ELARA.FindMinimum(test_one.output.fields.string, test_one.output.fields.number),
                // Return the `string` value for the record with the maximum value for `number`.
                findmaximum: ELARA.FindMaximum(test_one.output.fields.string, test_one.output.fields.number),
                // find the set of the non-null string values of `string`
                collectset: ELARA.CollectSet(test_one.output.fields.string),
                // create a dictionary of distinct key-value pairs of `string` => `number`
                collectdict: ELARA.CollectDict(test_one.output.fields.string, test_one.output.fields.number),
                // create a dictionary of the count of non-null values for keys of `string`
                collectdictcount: ELARA.CollectDictCount(test_one.output.fields.string),
                // create a dictionary of the sum of non-null values for key-value pairs of `string` => `number`
                collectdictsum: ELARA.CollectDictSum(test_one.output.fields.string, test_one.output.fields.number),
                // calculate the sum of the values of `Dict` where missing elements are presumed to have value of zero.
                sparsedictsum: ELARA.SparseDictSum(test_one.output.fields.Dict),
                // calculate the average values of `Dict` where missing elements are presumed to have value of zero.
                sparsedictmean: ELARA.SparseDictMean(test_one.output.fields.Dict),
                // calculate the average values of `Dict` where missing elements are presumed to have value of zero.
                sparsedictvariance: ELARA.SparseDictMean(test_one.output.fields.Dict),
                // calculate the covariance of the values of a `Dict` where missing elements are presumed to have value of zero.
                sparsedictcovariance: ELARA.SparseDictCovariance(test_one.output.fields.Dict),
            }
        })
    ],
})
```

### Adding disaggregate operation
The disaggregate operation allows the opposite of aggregate by allowing us to "unroll" any collection expression into the values (or key values). We can use `test_one.source` to disggregate the `Dict` `Expression` into its elements, we can output the collection values as well as some original input value:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { DisaggregateOperation, StringJoin, Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: "Disaggregate Dict",
    input_table: test_one.output,
    operations: [
        DisaggregateOperation({
            // the collection we want to disaggregate
            collection: test_one.output.fields.Dict,
            // the variable containing each dictionary value
            value: Variable("value", "float"),
            // the variable containing each dictionary key
            key: Variable("key", "string"),
            // set to true because we want to keep all the original input expressions also
            keep_all: true,
            selections: {
                // select the Key
                "Key": Variable("key", "string"),
                // select the value
                "Value": Variable("value", "float"),
            },
            primary_key: StringJoin`${test_one.output.fields.string}. ${Variable("Key", "string")}`
        }),
    ],
})
```

### Adding distribution operation
The distribution operation allows us to calculate the probability distributions for samples within a stream, based on a group key, in this case we will calculate the distribution of the `number` variable from `test_one.source`, within each value of `string`:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { DistributionOperation } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: "Distribution",
    input_table: test_one.output,
    operations: [
        DistributionOperation({
            samples: test_one.output.fields.number,
            group_key: test_one.output.fields.string,
            distribution: 'GaussianKDE',
            normalization: 'ProbabilityDensity'
        })
    ],
})
```

### Adding join operation
The join operation allows us to perform an expression-based relational join between two tables, in this case we will join `test_one.source` with `test_two.source`:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"
import test_two from "../../gen/test_two.source"

export default ELARA.PipelineSchema({
    name: 'Join',
    input_table: test_one.output,
    operations: [
        ELARA.JoinOperation({
            // the table being joined in 
            source_table: test_two.output,
            // the join key expression for the source, could be any string expression
            source_key: test_two.output.fields.string,
            // the join key expression for the target, could be any string expression
            target_key: test_one.output.fields.string,
            // the selections to apply to the source
            source_selections: {
                string: test_two.output.fields.string,
                date: test_two.output.fields.date,
                number: test_two.output.fields.number,
                integer: test_two.output.fields.integer,
                'boolean': test_two.output.fields['boolean'],
            },
            // the selections to apply to the source
            target_selections: {
                target_string: test_one.output.fields.string,
                target_date: test_one.output.fields.date,
                target_number: test_one.output.fields.number,
                target_integer: test_one.output.fields.integer,
                target_boolean: test_one.output.fields['boolean']
            },
            // perform an inner join on the keys
            join_type: 'Inner',
            // use the string expression foe the output primary key
            output_key: Variable("string", 'string')
        }),
    ],
})
```

### Adding offset operation
The offset operation allows you to correlate neighbouring data points in a timestream or other sorted data set. In the general case, a table might consist of rows from multiple distinct timestreams (or other sorted data), so the operation allows you to specify both a group key as well as a sort key, in addition to the offset (the number of rows away you are interested in). We can use `test_one.source` to demonstrate its usage, first grouping by the `boolean` field and then sorting by the `date` field in order to identify the previous datapoint by the `string` field (which in this case is the table's primary key):

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { OffsetOperation, Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Offset',
    input_table: test_one.output,
    operations: [
        OffsetOperation({
            // We are interested in the "previous" row in time
            offset: -1,
            // Separate time series based on the boolean field (optional)
            group_key: test_one.output.fields.boolean,
            // Sort each group in ascending order in time
            sort_key: test_one.output.fields.date,
            // Variable that specifies whether the a row at the chosen offset exists or not - in this case, whether it is the first row or not (optional)
            // (This variable is accessible inside offset_selections)
            offset_exists: Variable("previous_exists", "boolean"),
            // Additional fields to append to each row based on the previous row's data
            // (All the existing fields are preserved through the operation, and the primary key remains the same)
            offset_selections: {
                // Whether the row is the first in the group or not
                previous_exists: Variable("previous_exists", "boolean"),
                // The string field (primary key)
                previous_string: test_one.output.fields.string,
            },
        })
    ],
})
```

### Adding http operation
The http operation allows us to interact with a RESTful API both by making requests but also propogating the response. As an example we have configured a public facing endpoint at [webhook](https://webhook.site) to allow us to post some data, then capture a response to propogate:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Const, Environment, Equal, HttpOperation, IfElse, mapValues, Parse, RestApiRequest, RestApiResponse, Struct, StructType, Variable } from "@elaraai/edk/lib"

import test_one_source from "../../gen/test_one.source"

const response_headers_type = StructType({
    'content-type': 'string',
});

const test_one = test_one_source.output

export default ELARA.PipelineSchema({
    name: "Http",
    input_table: test_one,
    operations: [
        HttpOperation({
            // the `REQUEST_URL` is specified as an environment variable
            request: RestApiRequest({
                url: Environment('REQUEST_URL'),
                // POST some data
                method: 'POST',
                // send and accept json data
                accept: 'application/json',
                content: 'application/json',
                // we could also add a header with some basic authentication (but no need in this case)
                // headers: Struct({
                //     Authorisation: StringJoin`Bearer ${Environment("TOKEN")}`
                // })
                // send all of the expressions in `test_one` as a struct
                body: Struct(test_one.fields),
                // delay each request if the status code is 400
                delay_ms: IfElse(
                    Equal(Variable('status_code', 'integer'), 400n),
                    Const(62000n),
                    Const(400n)
                ),
            }),
            response: RestApiResponse({
                // place the status code in this variable - can be used in the output value
                status_code_variable: Variable("status_code", 'integer'),
                // place the status text in this variable - can be used in the output value
                status_text_variable: Variable("status_text", 'string'),
                // the expression to parse the response headers
                headers: Parse(Variable("headers", response_headers_type)),
                // the variable for the headers - can be used in the output value
                headers_variable: Variable("headers", response_headers_type),
                // the expression to parse the response body
                body: Parse(Variable("body", StructType(mapValues(test_one.fields, f => f.type)))),
                // the variable for the body - can be used in the output value
                body_variable: Variable("body", StructType(mapValues(test_one.fields, f => f.type))),
                // the expression for the output value produced on recieving a response
                value: Struct({
                    body: Variable("body", StructType(mapValues(test_one.fields, f => f.type))),
                    headers:  Variable("headers", response_headers_type),
                    status_code: Variable("status_code", 'integer'),
                    status_text: Variable("status_text", 'string'),
                })
            })
        })
    ],
})
```


### Adding join operation
The join operation allows us to perform an expression based relational join between two tables, in this case we will join `test_one.source` with `test_two.source`:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"
import test_two from "../../gen/test_two.source"

export default ELARA.PipelineSchema({
    name: 'Join',
    input_table: test_one.output,
    operations: [
        ELARA.JoinOperation({
            // the table being joined in 
            source_table: test_two.output,
            // the join key expression for the source, could be any string expression
            source_key: test_two.output.fields.string,
            // the join key expression for the target, could be any string expression
            target_key: test_one.output.fields.string,
            // the selections to apply to the source
            source_selections: {
                string: test_two.output.fields.string,
                date: test_two.output.fields.date,
                number: test_two.output.fields.number,
                integer: test_two.output.fields.integer,
                'boolean': test_two.output.fields['boolean'],
            },
            // the selections to apply to the source
            target_selections: {
                target_string: test_one.output.fields.string,
                target_date: test_one.output.fields.date,
                target_number: test_one.output.fields.number,
                target_integer: test_one.output.fields.integer,
                target_boolean: test_one.output.fields['boolean']
            },
            // perform an inner join on the keys
            join_type: 'Inner',
            // use the string expression foe the output primary key
            output_key: Variable("string", 'string')
        }),
    ],
})
```

### Adding select operation
The select operation allows us to select output expressions from input expressions, in this case we will create some new variables from `test_one.source`:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Multiply, SelectOperation, StringJoin, Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Select',
    input_table: test_one.output,
    operations: [
        SelectOperation({
            // dont keep all the input expressions, only output the new ones
            keep_all: false,
            // the new expressions to create
            selections: {
                // output the `number` value multiplied by 2.
                multiply: Multiply(test_one.output.fields.number, 2),
                // combine several fields incluing a formatted date into a single string
                'String Join': StringJoin`${test_one.output.fields.string}.${ELARA.Print(test_one.output.fields.date, 'DD/MM/YYYY')}`
            },
            // use the `String Join` value as the output key expression
            primary_key: Variable('String Join', 'string')
        })
    ],
})
```

## Add application
The application was added for the project with the following command: ```edk add plugin --name Application --def_dir src/plugin```. After running `edk update` the application contents was added to display the pipeline outputs with the ```PipelinePlugin``` for a default ```SuperUser```:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { ApplicationPlugin, Const, EnvironmentVariable, SuperUser, PipelinePlugin } from "@elaraai/edk/lib"

import aggregate from "../../gen/aggregate.pipeline"
import disaggregate_dict from "../../gen/disaggregate_dict.pipeline"
import filter from "../../gen/filter.pipeline"
import http from "../../gen/http.pipeline"
import join from "../../gen/join.pipeline"
import select from "../../gen/select.pipeline"

export default ELARA.Schema(
    ApplicationPlugin({
        name: "Pipelines",
        schemas: {
            "Operations" : PipelinePlugin({
                pipelines: [
                    aggregate,
                    disaggregate_dict,
                    filter,
                    http,
                    join,
                    select
                ]
            })
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ],
        environments: [
            EnvironmentVariable({ name: 'REQUEST_URL' }),
        ]
    })
)
```

## Reference

General reference documentation for EDK usage is available in the following links:
- [EDK CLI](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API](https://elaraai.github.io/docs/edk): programmatic api for the cli functionality
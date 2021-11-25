# Overview

Example solution that demonstrates the use of various manual options in a business context.

## Usage

Run `npm install` to install the package dependencies.

Run `edk build` to create the `schema.json`.

# Implementation
The project will involve creating some file based datasources, use these to build some structure instances and multiple `Option` types, then visualising the outputs in a page allowing interaction.

## Adding datasources
The data source was added with the following command: ```edk add datasource xlsx --name Sales --uri file://files/sales.xlsx --def_dir src/datasource```

This will create an empty json datasource:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.ExcelSourceSchema({
    name: "Sales",
    uri: "file://files/sales.xlsx",
})
```

## Detecting datasource
The output expressions were detected for the datasource with the following command: ```edk-io detect xlsx --asset sales.source  --defaults```

This will generate the types and expressions for ```sales.source```:

```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.ExcelSourceSchema({
    name: "Sales",
    uri: 'file://files/sales.xlsx',
    worksheets: {
        Suppliers: {
            primary_key: ELARA.Variable("Supplier", 'string'),
            selections: {
                Supplier: ELARA.Parse(ELARA.Variable("Supplier", 'string')),
                Cost: ELARA.Parse(ELARA.Variable("Cost", 'float')),
            },
        },
        Sales: {
            primary_key: ELARA.Print(ELARA.Variable("Sale", 'integer')),
            selections: {
                Sale: ELARA.Parse(ELARA.Variable("Sale", 'integer')),
                Date: ELARA.Parse(ELARA.Variable("Date", 'datetime')),
                Supplier: ELARA.Parse(ELARA.Variable("Supplier", 'string')),
                Qty: ELARA.Parse(ELARA.Variable("Qty", 'integer')),
                Refund: ELARA.Parse(ELARA.Variable("Refund", 'boolean')),
                Price: ELARA.Parse(ELARA.Variable("Price", 'float')),
            },
        },
    }
})
```

The datasource produces a two simple primitive type streams of supplier and sales records for an individual product.

## Add cash resource
First we can create a resource to track a cash balance for the business, with the following command: ```edk add structure resource --concept cash --def_dir src/structure```. This will add a resource which we can populate with a property to track the cash balance over time, as shown below:

```typescript
import { Property, Resource, ResourceStructureSchema, Temporal } from "@elaraai/edk/lib"

export default ResourceStructureSchema({
    concept: 'cash',
    instances: {
        // we will create a single static instance for the primary cash account in the business
        account: Resource({
            properties: {
                // we will create a `Termporal` property that reports values over time
                balance: Temporal({
                    // the initial balance of cash is 1000.0
                    initial_value: 1000.00,
                    // for reporting sample per day
                    sampling_unit: "hour",
                    // calculate each of the following statistics from the outcomes
                    // note that at every point in time there will be a distribution of values
                    // for the balance, here we are defining how we want to sample the distribution
                    // or in other words we want the 50th percentile.
                    sampling_statistic: {
                        "median": "p50"
                    }
                }),
            }
        })
    }
})
```


### Add supplier agent
Next we can create an agent to track a the suppliers for the product, with the following command: ```edk add structure agent --concept supplier --def_dir src/structure```. This will add a resource which we can populate with values from our datasource, as shown below:

```typescript
import { AgentStructureSchema } from "@elaraai/edk/lib"

// import our generated sales datasource
import sales_source from "../../gen/sales.source"

// get the suppliers stream
const suppliers  = sales_source.outputs.Suppliers.table

export default AgentStructureSchema({
    concept: "supplier",
    // create a mapping to project each supplier to an agent
    mapping: {
        input_table: suppliers,
        properties: {
            // the cost is fixed for each supplier, we will assume we can't change this
            Cost: suppliers.fields.Cost
        }
    }
})
```

## Add scenario
In order to apply an `Option` we need to add a scenario, we can use a single one where all the outcomes will reside, with the following command: ```edk add scenario --name baseline --def_dir src/scenario```. This will result in the scenario definition shown below:

```typescript
import { ScenarioSchema } from "@elaraai/edk/lib"

export default ScenarioSchema({
    name: 'baseline',
})
```

## Update solution
Currently there wouldn't be any generated files to reference within our process, so before continuing we have to run the followign command: ```edk update```. Following this the ```gen``` directory will contain components such as ```gen/sales.source.ts``` and ```gen/cash.structure.ts``` that can be imported in other definitions.

## Add sales process
Now that we have a resource, we can create a sales process instance from each record in the datasource. First we create the `sales` process with the following command: `edk add structure process --concept sales --def_dir src/structure`. This will add a process which we can populate with a several properties to get, process then update the cash resource balance, as shown below:

```typescript
import {
  Add,
  AddDuration,
  DictType,
  Get,
  GetProperties,
  GetProperty,
  IfElse,
  Multiply,
  Option,
  Print,
  ProcessMapping,
  ProcessStructureSchema,
  Property,
  Subtract,
  SubtractDuration,
} from '@elaraai/edk/lib';

import baseline_scenario from '../../gen/baseline.scenario';
import cash from '../../gen/cash.structure';
import sales_source from '../../gen/sales.source';
import supplier from '../../gen/supplier.structure';

const sales = sales_source.outputs.Sales.table

export default ProcessStructureSchema({
    concept: "sales",
    mapping: ProcessMapping({
        input_table: sales,
        marker: Print(sales.fields.Sale),
        date: Property("datetime", 'datetime'),
        properties: {
            min_datetime: SubtractDuration(sales.fields.Date, 2, 'week'),
            datetime: Option({
                default_value: sales.fields.Date,
                manual: [
                    {
                        scenario: baseline_scenario,
                        min: SubtractDuration(sales.fields.Date, 2, 'week'),
                        max: AddDuration(sales.fields.Date, 2, 'week')
                    },
                ],
                date: Property("min_datetime", "datetime"),
            }),
            costs: GetProperties({
                property: supplier.properties.Cost
            }),
            refund: Option({
                default_value: sales.fields.Refund,
                manual: [
                    {
                        scenario: baseline_scenario,
                    },
                ]
            }),
            price: Option({
                default_value: sales.fields.Price,
                manual: [
                    {
                        scenario: baseline_scenario,
                        min: Multiply(sales.fields.Price, 0.5),
                        max: Multiply(sales.fields.Price, 2.0),
                    },
                ]
            }),
            qty: Option({
                default_value: sales.fields.Qty,
                manual: [
                    {
                        scenario: baseline_scenario,
                        min: 0n,
                        max: Add(sales.fields.Qty, 5n),
                    },
                ]
            }),
            supplier: Option({
                default_value: sales.fields.Supplier,
                manual: [
                    {
                        scenario: baseline_scenario,
                        range: new Set(['A', 'B', 'C', 'D', 'E', 'F'])
                        // TODO: below should work
                        // Keys(Property('costs', DictType('float')))
                    },
                ]
            }),
            cash_balance: GetProperty({ property: cash.properties.balance }),
            cost: Get(Property("costs", DictType('float')), Property("supplier", 'string')),
            profit: Multiply(
                IfElse(
                    Property("refund", "boolean"),
                    Multiply(Property("qty", "integer"), -1n),
                    Property("qty", "integer"),
                ),
                Subtract(
                    Property("price", 'float'),
                    Property("cost", 'float') 
                )
            ),
        },
        events: {
            increment_cash: {
                property: cash.properties.balance,
                value: Add(
                    Property("cash_balance", "float"), 
                    Property("profit", "float")
                ),
            }
        },
    })
})
```
Now if we were to deploy the project, it will simulate the likely cash balance over time, based on the price, and qty. Also, proposals for optimum prices from the initial will be generated for each sales record.

## Add application
The application was added for the project with the following command: ```edk add plugin --name Application --def_dir src/plugin```. A page was added with the ```OptionsPlugin``` to view the  sales records and allow manual option value to be updated, and seperately display the cash balance over time.

```typescript
import { 
    ApplicationPlugin, Const, Schema,
    SuperUser, DataSourcePlugin, OptionsPlugin
} from '@elaraai/edk/lib';

import sales_source from '../../gen/sales.source';
import baseline from '../../gen/baseline.scenario';
import cash from '../../gen/cash.structure';
import sales from '../../gen/sales.structure';

export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        schemas: {
            Options: OptionsPlugin({
                name: "sales",
                entity: sales,
                scenario: baseline,
                options: {
                    datetime: sales.properties.datetime,
                    qty: sales.properties.qty,
                    supplier: sales.properties.supplier,
                    refund: sales.properties.refund,
                    price: sales.properties.price,
                },
                values: {
                    cost: sales.properties.cost,
                    profit: sales.properties.profit,
                },
                output_entity: cash,
                output: cash.properties.balance,
            }),
            Datasource: DataSourcePlugin({
                datasources: [sales_source]
            })
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin')
            })
        ],
    })
)
```

## Reference
General reference documentation for EDK usage is available in the following links:
- [EDK CLI](https://elaraai.github.io/docs/cli/cli): detailed CLI usage reference and examples
- [EDK API](https://elaraai.github.io/docs/edk): programmatic api for the cli functionality
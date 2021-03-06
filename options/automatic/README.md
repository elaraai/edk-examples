# Overview

Example solution that demonstrates the optimization of a simple sales process, based on typical demand elasticity. We have been given historic sales qtys at discrete times, and our goal is to determine the optimium sales price at each point in time in the future to maximise profit. A key assumption is that price may have an impact on demand.

## Usage

Run `npm install` to install the package dependencies.

Run `edk build` to create the `schema.json`.

# Implementation
The project will involve creating some file based datasources, use these to build some structure instances and multiple `Option` types, then visualising the outputs in a page allowing interaction.

## Adding datasources
The data source was added with the following command: ```edk add datasource json --name Sales --uri file://files/sales.json --def_dir src/datasource```

This will create an empty json datasource:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.JsonSourceSchema({
    name: "Sales",
    uri: "file://files/sales.json",
})
```

## Detecting datasource
The output expressions were detected for the datasource with the following command: ```edk-io detect json --asset sales.source --defaults```

This will generate the types and expressions for ```json.source```:

```typescript
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.JsonSourceSchema({
    name: "Sales",
    uri: "file://files/sales.json",
    primary_key: ELARA.Print(ELARA.Variable("ID", 'integer')),
    selections: {
        Cost: ELARA.Parse(ELARA.Variable("Cost", 'float')),
        Profit: ELARA.Parse(ELARA.Variable("Profit", 'float')),
        Predict: ELARA.Parse(ELARA.Variable("Predict", 'boolean')),
        Date: ELARA.Parse(ELARA.Variable("Date", 'datetime')),
        Price: ELARA.Parse(ELARA.Variable("Price", 'float')),
        Qty: ELARA.Parse(ELARA.Variable("Qty", 'float')),
        ID: ELARA.Parse(ELARA.Variable("ID", 'integer')),
    },
})
```

The datasource produces a simple primitive type stream of sales records for an individual product.

## Add resource
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
                    // mark as an objective - our goal is to maximise cash
                    objective: Property("balance", "float"),
                    // for reporting sample per day
                    sampling_unit: "hour",
                    // calculate each of the following statistics from the outcomes
                    // note that at every point in time there will be a distribution of values
                    // for the balance, here we are defining how we want to sample the distribution
                    // or in other words we want the 15th, 50th, and 85th percentiles.
                    sampling_statistic: {
                        "median": "p50",
                        "lower": "p15",
                        "upper": "p85"
                    }
                }),
            }
        })
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
Currently there wouldn't be any generated files to reference within our process, so before continuing we have to run the following command: ```edk update```. Following this the ```gen``` directory will contain components such as ```gen/sales.source.ts``` and ```gen/cash.structure.ts``` that can be imported in other definitions.

## Add sales process
Now that we have a resource, we can create a sales process instance from each record in the datasource. First we create the `sales` process with the following command: `edk add structure process --concept sales --def_dir src/structure`. This will add a process which we can populate with a several properties to get, process then update the cash resource balance, as shown below:

```typescript
import * as ELARA from '@elaraai/edk/lib';
import {
  Add,
  GetProperty,
  Hour,
  MLFunction,
  Multiply,
  Not,
  Option,
  ProcessMapping,
  Property,
  StringJoin,
  Subtract,
} from '@elaraai/edk/lib';

import cash from '../../gen/cash.structure';
import optimized_scenario from '../../gen/optimized.scenario';
import sales_source from '../../gen/sales.source';

export default ELARA.ProcessStructureSchema({
    concept: 'sales',
    mapping: ProcessMapping({
        input_table: sales_source.output,
        date: sales_source.output.fields.Date,
        marker: StringJoin`${sales_source.output.fields.ID}`,
        properties: {
            hour: Hour(sales_source.output.fields.Date),
            cost: sales_source.output.fields.Cost,
            price: Option({
                default_value: sales_source.output.fields.Price,
                automatic: [
                    { 
                        scenario: optimized_scenario, 
                        min: Multiply(sales_source.output.fields.Price, 0.5), 
                        max: Multiply(sales_source.output.fields.Price, 2.0),
                        active: sales_source.output.fields.Predict
                    },
                ]
            }),
            qty: MLFunction({
                output: sales_source.output.fields.Qty,
                features: {
                    "Price": Property("price", "float"),
                    "Hour": Property("hour", "integer"),
                },
                train: Not(sales_source.output.fields.Predict),
                evaluate: sales_source.output.fields.Predict,
            }),
            profit: Multiply(
                Property("qty", "float"),
                Subtract(
                    Property("price", 'float'),
                    Property("cost", 'float')
                )
            ),
            cash_balance: GetProperty({ property: cash.properties.balance }),
        },
        events: {
            increment_cash: {
                property: cash.properties.balance,
                value: Add(Property("cash_balance", "float"), Property("profit", "float")),
            }
        }
    })
})
```
Now if we were to deploy the project, it will simulate the likely cash balance over time, based on the price, and qty. Also, proposals for optimum prices from the initial will be generated for each sales record.

## Add application
The application was added for the project with the following command: ```edk add plugin --name Application --def_dir src/plugin```. The application contents was added to display the simulation outputs with the `SimulationPlugin`. Also a page was added with the ```ScenarioComparePlugin``` to view the optimised sales records, and separately display the cash balance (and its uncertainty) over time.

```typescript
import { 
    ApplicationPlugin, Const, OptionsPlugin, Schema,
    SimulationPlugin, SuperUser, mergeSchemas
} from '@elaraai/edk/lib';

import baseline from '../../gen/baseline.scenario';
import cash from '../../gen/cash.structure';
import sales from '../../gen/sales.structure';

export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        schemas: {
            Optimisation: ScenarioComparePlugin({
                name: "sales",
                entity: sales,
                baseline_scenario: baseline,
                comparison_scenario: optimized,
                output_entity: cash,
                output: cash.properties.balance,
                values: {
                    date: sales.date,
                    qty: sales.properties.qty,
                    cost: sales.properties.cost,
                    profit: sales.properties.profit,
                },
                options: {
                    price: sales.properties.price,
                }
            }),
            Predictions: mergeSchemas(
                SimulationPlugin({
                    name: "Sales Results",
                    entity: sales,
                    properties: sales.properties
                }),
                SimulationPlugin({
                    name: "Cash Results",
                    entity: cash,
                    marker: "account",
                    properties: cash.properties,
                })
            ),
            'Machine Learning': MLFunctionPlugin({
                func: sales.properties.qty.function
            }),
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
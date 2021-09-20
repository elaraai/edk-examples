# Overview

Example solution that demonstrates the use of the [EDK npm package](https://www.npmjs.com/package/@elaraai/edk) to create various file type data sources.

# Usage

Run `npm install` to install the package dependencies.

The solution can be built using the following command ```edk build```.

# Implementation
The project will involve creating some file based datasources, detecting their outputs, then visualising the outputs.

## Adding datasources
Each data source was added with the following EDK commands:

- suppliers: ```edk add datasource json --name Suppliers --uri file://files/suppliers.jsonl --def_dir src/datasource```
- work: ```edk add datasource json --name Work --uri file://files/work.jsonl --def_dir src/datasource```
- invoices: ```edk add datasource json --name Invoices --uri file://files/invoices.jsonl --def_dir src/datasource```

This will create an empty datasource for each file, for example for the invoices datasource:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.JsonSourceSchema({
    name: "Invoices",
    uri: 'file://files/invoices.jsonl',
})
```

## Detecting datasources
The output expressions were detected for each data with the following commands.
- json: ```edk-io detect json --asset suppliers.source --defaults```
- json: ```edk-io detect json --asset work.source --defaults```
- json: ```edk-io detect json --asset invoices.source --defaults```

This will generate the types and expressions for the datasources, for example for ```invoices.source```:

```typescript
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.JsonSourceSchema({
    name: "Invoices",
    uri: 'file://files/invoices.jsonl',
    primary_key: ELARA.Variable("id", 'string'),
    selections: {
        id: ELARA.Parse(ELARA.Variable("id", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        supplier: ELARA.Parse(ELARA.Variable("supplier", 'string')),
    },
})
```

## Add cash resource
First we can create a resource to track a cash balance for the business, with the following command: ```edk add structure resource --concept cash --def_dir src/structure```. This will add a resource which we can populate with a property to track the cash balance over time, as shown below:

```typescript
import { Resource, ResourceStructureSchema, Temporal } from "@elaraai/edk/lib"

export default ResourceStructureSchema({
    concept: 'cash',
    instances: {
        account: Resource({
            properties: {
                balance: Temporal({
                    initial_value: 1000.00,
                    sampling_unit: "day",
                    sampling_statistic: {
                        "median": "p50",
                    }
                }),
            }
        })
    }
})
```

## Add supplier resource
First we can create a resource to track a cash balance for the business, with the following command: ```edk add structure resource --concept supplier --def_dir src/structure```. This will add a resource which we can populate with a property to track the cash balance over time, as shown below:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Temporal } from "@elaraai/edk/lib"

import suppliers_source from '../../gen/suppliers.source'

const suppliers = suppliers_source.output

export default ELARA.ResourceStructureSchema({
    concept: "supplier",
    mapping: {
        input_table: suppliers,
        properties: {
            name: suppliers.fields.name,
            terms: suppliers.fields.terms,
            subcontractors: suppliers.fields.subcontractors,
            rate: suppliers.fields.rate,
            work: Temporal({
                initial_value: 0.00,
                sampling_unit: "day",
                sampling_statistic: {
                    "median": "p50",
                }
            })
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

## Add work process
Now that we have a resource, we can create a work process instance from each record in the datasource. First we create the `work` process with the following command: `edk add structure process --concept work --def_dir src/structure`. This will add a process which we can populate with a several properties to get, process then update the cash resource balance, as shown below:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { Property, GetProperty, AddDuration, ProcessDate, Add } from "@elaraai/edk/lib"

import work_source from '../../gen/work.source'
import supplier from "../../gen/supplier.structure"

const work = work_source.output

export default ELARA.ProcessStructureSchema({
    concept: "work",
    mapping: {
        input_table: work,
        date: work.fields.date,
        properties: {
            hours: work.fields.hours,
            subcontractor: work.fields.subcontractor,
            supplier: work.fields.supplier,
            work: GetProperty({
                property: supplier.properties.work,
                marker: Property('supplier', 'string')
            }),
            completion: AddDuration(ProcessDate(), Property('hours', 'float'), 'hour'),
        },
        events: {
            update_work: {
                property: supplier.properties.work,
                marker: Property('supplier', 'string'),
                date: Property('completion', 'datetime'),
                value: Add(Property('work', 'float'), Property('hours', 'float'))
            }
        }
    }
})
```

## Add payment process
Now that we have a resource, we can create a work process instance from each record in the datasource. First we create the `work` process with the following command: `edk add structure process --concept payment --def_dir src/structure`. This will add a process which we can populate with a several properties to get, process then update the cash resource balance, as shown below:

```typescript
import * as ELARA from "@elaraai/edk/lib"
import { AddDuration, GetProperty, Multiply, ProcessDate, Property } from "@elaraai/edk/lib"

import invoices_source from '../../gen/invoices.source'
import supplier from "../../gen/supplier.structure"

const invoices = invoices_source.output

export default ELARA.ProcessStructureSchema({
    concept: "payment",
    mapping: {
        input_table: invoices,
        date: invoices.fields.date,
        properties: {
            supplier: invoices.fields.supplier,
            work: GetProperty({
                property: supplier.properties.work,
                marker: Property('supplier', 'string')
            }),
            rate: GetProperty({
                property: supplier.properties.rate,
                marker: Property('supplier', 'string')
            }),
            terms: GetProperty({
                property: supplier.properties.terms,
                marker: Property('supplier', 'string')
            }),
            payment_date: AddDuration(ProcessDate(), Property('terms', 'float'), 'week'),
            amount: Multiply(Property('rate', 'float'), Property('work', 'float')),
        },
        events: {
            // reset the total of work
            reset_work: {
                property: supplier.properties.work,
                marker: Property('supplier', 'string'),
                date: ProcessDate(),
                value: 0.0
            },
            // pay for the work the invoice date plus payment terms
            pay_work: {
                property: supplier.properties.work,
                marker: Property('supplier', 'string'),
                date: Property('payment_date', 'datetime'),
                value: Property('amount', 'float')
            },
        }
    }
})
```

## Add application
The application was added for the project with the following command: ```edk add plugin --name Application --def_dir src/plugin```. The application contents was added to display the datasource and simulation outputs with the ```DataSourcePlugin``` for a default ```SuperUser```:

```typescript
import { 
    ApplicationPlugin, Const, Schema,
    SimulationPlugin, SuperUser, mergeSchemas, DataSourcePlugin
} from '@elaraai/edk/lib';


import cash from '../../gen/cash.structure';
import work from '../../gen/work.structure';
import supplier from '../../gen/supplier.structure';
import payment from '../../gen/payment.structure';
import invoices_source from '../../gen/invoices.source';
import suppliers_source from '../../gen/suppliers.source';
import work_source from '../../gen/work.source';

export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        schemas: {
            Predictions: mergeSchemas(
                SimulationPlugin({
                    name: "Work Results",
                    entity: work,
                    marker: "work marker",
                    properties: work.properties,
                }),
                SimulationPlugin({
                    name: "Cash Results",
                    entity: cash,
                    marker: "account",
                    properties: cash.properties,
                }),
                SimulationPlugin({
                    name: "Supplier Results",
                    entity: supplier,
                    properties: supplier.properties,
                }),
                SimulationPlugin({
                    name: "Payment Results",
                    entity: payment,
                    properties: payment.properties,
                })
            ),
            Datasources: DataSourcePlugin({
                datasources: [
                    invoices_source,
                    suppliers_source,
                    work_source
                ]
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
// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
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

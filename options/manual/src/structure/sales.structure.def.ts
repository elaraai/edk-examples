// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
    Multiply, Option,
    ProcessStructureSchema, ProcessMapping, Print, GetProperties, Property, DictType, SubtractDuration, AddDuration, Add, GetProperty, Subtract, Get, IfElse
} from '@elaraai/edk/lib';

import baseline_scenario from '../../gen/baseline.scenario';
import cash from '../../gen/cash.structure';
import supplier from '../../gen/supplier.structure';
import sales_source from '../../gen/sales.source';

const sales = sales_source.outputs.Sales.table

export default ProcessStructureSchema({
    concept: "sales",
    mapping: ProcessMapping({
        input_table: sales,
        date: Property("datetime", 'datetime'),
        marker: Print(sales.fields.Sale),
        properties: {
            costs: GetProperties({
                property: supplier.properties.Cost
            }),
            datetime: Option({
                default_value: sales.fields.Date,
                manual: [
                    {
                        scenario: baseline_scenario,
                        min: SubtractDuration(sales.fields.Date, 2, 'week'),
                        max: AddDuration(sales.fields.Date, 2, 'week')
                    },
                ]
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
        }
    })
})
// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import {
    Add,
    AddDuration,
    Const,
    DictType,
    Get,
    GetProperties,
    GetProperty,
    IfElse,
    In,
    Multiply,
    NewSet,
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
            tags: Option({
                default_value: sales.fields.Tags,
                manual: [
                    {
                        scenario: baseline_scenario,
                        range: NewSet(
                            "Tag One",
                            "Tag Two",
                            "Tag Three",
                            "Tag Four",
                            "Another (but long) Tag Four",
                            "Tag Five",
                        ),
                    },
                ]
            }),
            cash_balance: GetProperty({ property: cash.properties.balance }),
            cost: Get(Property("costs", DictType('float')), Property("supplier", 'string')),
            profit: Multiply(
                IfElse(
                    Property("refund", "boolean"),
                    IfElse(
                        In(Property("tags", "set"), Const("Tag One")),
                        Multiply(Property("qty", "integer"), -1n),
                        Multiply(Property("qty", "integer"), -5n),
                    ),
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

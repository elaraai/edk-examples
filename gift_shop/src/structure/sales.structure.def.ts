// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Add, AddAll, AddDict, DictType, GetProperties, GetProperty, GreaterEqual, Less, MLFunction, MultiplyDict, Null, ProcessMapping, Property, Replace } from "@elaraai/edk/lib"

import money from "../../gen/money.structure"
import products from "../../gen/products.structure"
import structure_pipeline_plugin from "../../gen/structure_pipelines.plugin"

const sales = structure_pipeline_plugin.pipeline.Sales.output_table

export default ELARA.ProcessStructureSchema({
    concept: "Sales",
    mapping: ProcessMapping({
        input_table: sales,
        date: sales.fields.Date,
        properties: {
            HourlyCycle: sales.fields.HourlyCycle,
            WeeklyCycle: sales.fields.WeeklyCycle,
            CumulativeBalance: GetProperty({ property: money.properties.Balance }),
            Prices: GetProperties({ property: products.properties.Price }),
            Discounts: GetProperties({ property: products.properties.Discount }),
            CovidCases: Replace(sales.fields.TotalCovidCases, Null('integer'), 0n),
            CumulativeQty: GetProperties({ property: products.properties.Qty }),
            Qty: MLFunction({
                value: sales.fields.TotalSalesQty,
                train: Less(sales.fields.HourlyCycle, 0n),
                predict: GreaterEqual(sales.fields.HourlyCycle, 0n),
                features: {
                    CovidCases: Property("CovidCases", "integer"),
                    Prices: Property("Prices", DictType("float")),
                    Discounts: Property("Discounts", DictType("float")),
                }
            }),
            Amount: MultiplyDict(
                Property("Qty", DictType("integer")), 
                MultiplyDict(
                    Property("Discounts", DictType("float")), 
                    Property("Prices", DictType("float"))
                )
            )
        },
        events: {
            AdjustMoney: {
                    property: money.properties.Balance,
                    value: Add(
                        Property("CumulativeBalance", "float"), 
                        AddAll(Property("Amount", DictType("float")))
                    ),
            },
            AdjustQty: {
                property: products.properties.Qty,
                values: AddDict(
                    Property("CumulativeQty", DictType("integer")),
                    Property("Qty", DictType("integer"))
                )
            }
        }
    })
})

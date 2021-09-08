// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Add, AddAll, AddDict, DayOfWeek, DictType, GenericFunction, GetProperties, GetProperty, Greater, Hour, IsNotNull, IsNull, MLFunction, Month, MultiplyDict, Null, ProcessMapping, Property, Replace, WeekOfMonth } from "@elaraai/edk/lib"

import metrics from "../../gen/metrics.structure"
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
            HourOfDay: Hour(sales.fields.Date),
            DayOfWeek: DayOfWeek(sales.fields.Date),
            WeekOfMonth: WeekOfMonth(sales.fields.Date),
            MonthOfYear: Month(sales.fields.Date),
            CurrentMoneyBalance: GetProperty({ property: money.properties.Balance }),
            CurrentWeeklySalesQty: GetProperty({ property: metrics.properties.WeeklySalesQty }),
            CurrentProductPrices: GetProperties({ property: products.properties.Price }),
            TotalCovidCases: Replace(sales.fields.TotalCovidCases, Null('integer'), 0n),
            MeanProductPrices: GenericFunction({
                expression: Property("CurrentProductPrices", DictType("float")),
                value: sales.fields.MeanProductPrice,
                predict: Greater(sales.fields.Cycle, 0n)
            }),
            TotalQty: MLFunction({
                value: sales.fields.TotalSalesQty,
                train: IsNotNull(sales.fields.TotalSalesQty),
                predict: IsNull(sales.fields.TotalSalesQty),
                features: {
                    HourOfDay: Property("HourOfDay", "integer"),
                    DayOfWeek: Property("DayOfWeek", "integer"),
                    WeekOfMonth: Property("WeekOfMonth", 'integer'),
                    MonthOfYear: Property("MonthOfYear", "integer"),
                    TotalCovidCases: Property("TotalCovidCases", "integer"),
                    MeanProductPrices: Property("MeanProductPrices", DictType("float")),
                }
            }),
            TotalAmount: MultiplyDict(
                Property("TotalQty", DictType("integer")), 
                Property("MeanProductPrices", DictType("float"))
            )
        },
        events: {
            AdjustMoney: {
                    property: money.properties.Balance,
                    value: Add(
                        Property("CurrentMoneyBalance", "float"), 
                        AddAll(Property("TotalAmount", DictType("float")))
                    ),
            },
            AdjustWeeklySalesQty: {
                property: metrics.properties.WeeklySalesQty,
                value: AddDict(
                    Property("CurrentWeeklySalesQty", DictType("float")), 
                    Property("TotalAmount", DictType("float"))
                ),
            }
        }
    })
})

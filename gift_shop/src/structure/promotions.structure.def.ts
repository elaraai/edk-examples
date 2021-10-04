// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"


import { Option, GetProperties, ProcessMapping, Multiply } from "@elaraai/edk/lib"

import products from "../../gen/products.structure"
import structure_pipeline_plugin from "../../gen/structure_pipelines.plugin"

const promotions = structure_pipeline_plugin.pipeline.Promotions.output_table
import baseline from "../../gen/baseline.scenario"

export default ELARA.ProcessStructureSchema({
    concept: "Promotions",
    mapping: ProcessMapping({
        input_table: promotions,
        date: promotions.fields.Date,
        properties: {
            DailyCycle: promotions.fields.DailyCycle,
            WeeklyCycle: promotions.fields.WeeklyCycle,
            CurrentDiscounts: GetProperties({ property: products.properties.Discount }),
            Prices: GetProperties({ property: products.properties.Price }),
            Discount: Option({
                default_value: promotions.fields.MeanSalesPrice,
                manual: [{
                    scenario: baseline,
                    min: Multiply(promotions.fields.MeanSalesPrice, 0.8),
                    max: Multiply(promotions.fields.MeanSalesPrice, 1.2),
                }],
                sensitivity: [{
                    scenario: baseline,
                    min: Multiply(promotions.fields.MeanSalesPrice, 0.8),
                    max: Multiply(promotions.fields.MeanSalesPrice, 1.2)
                }]
            }),
        },
        events: { }
    })
})

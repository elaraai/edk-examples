// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Const, Multiply, Option, Temporal } from "@elaraai/edk/lib"

import baseline from "../../gen/baseline.scenario"
import structure_pipeline_plugin from "../../gen/structure_pipelines.plugin"

const products = structure_pipeline_plugin.pipeline.Products.output_table

export default ELARA.ResourceStructureSchema({
    concept: "Products",
    mapping: {
        input_table: products,
        properties: {
            Discount: Temporal({
                initial_value: Const(1.0),
            }),
            Price: Option({
                default_value: products.fields.Price,
                manual: [{
                    scenario: baseline,
                    min: Multiply(products.fields.Price, 0.8),
                    max: Multiply(products.fields.Price, 1.2),
                }],
                sensitivity: [{
                    scenario: baseline,
                    min: Multiply(products.fields.Price, 0.8),
                    max: Multiply(products.fields.Price, 1.2),
                }]
            }),
            Qty: Temporal({
                initial_value: Const(0n),
            }),
        }
    },
})

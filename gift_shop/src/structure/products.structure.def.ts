// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Multiply, Option } from "@elaraai/edk/lib"

import baseline from "../../gen/baseline.scenario"
import structure_pipeline_plugin from "../../gen/structure_pipelines.plugin"

const products = structure_pipeline_plugin.pipeline.Products.output_table

export default ELARA.ResourceStructureSchema({
    concept: "Products",
    mapping: {
        input_table: products,
        properties: {
            Price: Option({
                default_value: products.fields.Price,
                manual: [{
                    scenario: baseline,
                    min: Multiply(products.fields.MinPrice, 0.9),
                    max: Multiply(products.fields.MaxPrice, 1.1),
                }],
                sensitivity: [{
                    scenario: baseline,
                    min: Multiply(products.fields.MinPrice, 0.9),
                    max: Multiply(products.fields.MaxPrice, 1.1),
                }]
            })
        }
    },
})

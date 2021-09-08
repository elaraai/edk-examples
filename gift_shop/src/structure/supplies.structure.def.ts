// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Multiply, Option } from "@elaraai/edk/lib"

import baseline from "../../gen/baseline.scenario"
import structure_pipeline_plugin from "../../gen/structure_pipelines.plugin"

const supplies = structure_pipeline_plugin.pipeline.Supplies.output_table

export default ELARA.ResourceStructureSchema({
    concept: "Supplies",
    mapping: {
        input_table: supplies,
        properties: {
            Cost: Option({
                default_value: supplies.fields.Cost,
                manual: [{
                    scenario: baseline,
                    min: Multiply(supplies.fields.MinCost, 0.9),
                    max: Multiply(supplies.fields.MaxCost, 1.1),
                }],
                sensitivity: [{
                    scenario: baseline,
                    min: Multiply(supplies.fields.MinCost, 0.9),
                    max: Multiply(supplies.fields.MaxCost, 1.1),
                }]
            })
        }
    }
})

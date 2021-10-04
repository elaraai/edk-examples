// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { ProcessMapping } from "@elaraai/edk/lib"

import structure_pipeline_plugin from "../../gen/structure_pipelines.plugin"

const purchases = structure_pipeline_plugin.pipeline.Purchases.output_table

export default ELARA.ProcessStructureSchema({
    concept: "Purchases",
    mapping: ProcessMapping({
        input_table: purchases,
        date: purchases.fields.Date,
        properties: {},
        events: {}
    })
})

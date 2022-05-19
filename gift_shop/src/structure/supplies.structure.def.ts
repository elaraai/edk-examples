// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';

import structure_pipeline_plugin from '../../gen/structure_pipelines.plugin';

const supplies = structure_pipeline_plugin.pipeline.Supplies.output_table

export default ELARA.ResourceStructureSchema({
    concept: "Supplies",
    mapping: {
        input_table: supplies,
        properties: {
            // Cost: Option({
            //     default_value: supplies.fields.Cost,
            //     manual: [{
            //         scenario: baseline,
            //         min: Multiply(supplies.fields.Cost, 0.8),
            //         max: Multiply(supplies.fields.Cost, 1.2),
            //     }],
            //     sensitivity: [{
            //         scenario: baseline,
            //         min: Multiply(supplies.fields.Cost, 0.8),
            //         max: Multiply(supplies.fields.Cost, 1.2),
            //     }],
            // }),
            // Terms: Option({
            //     default_value: supplies.fields.Terms,
            //     manual: [{
            //         scenario: baseline,
            //         min: Multiply(supplies.fields.Terms, 0.5),
            //         max: Multiply(supplies.fields.Terms, 2.0),
            //     }],
            //     sensitivity: [{
            //         scenario: baseline,
            //         min: Multiply(supplies.fields.Terms, 0.5),
            //         max: Multiply(supplies.fields.Terms, 2.0),
            //     }],
            // })
        }
    }
})

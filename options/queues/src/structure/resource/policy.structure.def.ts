// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Option } from "@elaraai/edk/lib"

import policy_source from "../../../gen/policy.source"
import baseline_scenario from "../../../gen/baseline.scenario"
import optimised_scenario from "../../../gen/optimised.scenario"

const policy = policy_source.output

export default ELARA.ResourceStructureSchema({
    concept: "Policy",
    mapping: {
        input_table: policy,
        properties: {
            queue: policy.fields.Queue,
            type: policy.fields.Type,
            bias: Option({
                default_value: policy.fields.Bias,
                automatic: [
                    {
                        scenario: optimised_scenario,
                        min: policy.fields.BiasMin,
                        max: policy.fields.BiasMax
                    },
                ]
            }),
            queue_load: Option({
                default_value: policy.fields.Load,
                automatic: [
                    {
                        scenario: optimised_scenario,
                        min: policy.fields.LoadMin,
                        max: policy.fields.LoadMax
                    },
                ]
            }),
            duration_perturbation: Option({
                default_value: 0,
                sensitivity: [
                    {
                        scenario: baseline_scenario,
                        min: 0,
                        max: 120
                    },
                ]
            })
        }
    }
})

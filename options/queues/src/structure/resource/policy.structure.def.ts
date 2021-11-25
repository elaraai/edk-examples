// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Option,
  Property,
} from '@elaraai/edk/lib';

import baseline_scenario from '../../../gen/baseline.scenario';
import optimised_scenario from '../../../gen/optimised.scenario';
import policy_source from '../../../gen/policy.source';

const policy = policy_source.output

export default ELARA.ResourceStructureSchema({
    concept: "Policy",
    mapping: {
        input_table: policy,
        properties: {
            date: new Date("2021-01-02T00:00:00.000Z"), // Seperates "past" from "future"
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
                ],
                date: Property("date", "datetime"),
            }),
            queue_load: Option({
                default_value: policy.fields.Load,
                automatic: [
                    {
                        scenario: optimised_scenario,
                        min: policy.fields.LoadMin,
                        max: policy.fields.LoadMax
                    },
                ],
                date: Property("date", "datetime"),
            }),
            duration_perturbation: Option({
                default_value: 0,
                sensitivity: [
                    {
                        scenario: baseline_scenario,
                        min: 0,
                        max: 120
                    },
                ],
                date: Property("date", "datetime"),
            })
        },
    }
})

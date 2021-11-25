// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Option,
  Property,
  Resource,
} from '@elaraai/edk/lib';

import baseline_scenario from '../../../gen/baseline.scenario';
import optimised_scenario from '../../../gen/optimised.scenario';

export default ELARA.ResourceStructureSchema({
    concept: "Mode",
    instances: {
        allocation: Resource({
            properties: {
                date: new Date("2021-01-02T00:00:00.000Z"), // Seperates "past" from "future"
                optimise: Option({
                    default_value: false,
                    proposals: [
                        { scenario: baseline_scenario, value: false },
                        { scenario: optimised_scenario, value: true }
                    ],
                    date: Property("date", "datetime"),
                })
            }
        })
    }
})

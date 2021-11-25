// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Resource,
  Temporal,
} from '@elaraai/edk/lib';

export default ELARA.ResourceStructureSchema({
    concept: "stuff",
    instances: {
        stuff: Resource({
            properties: {
                balance: Temporal({
                    initial_value: 0.00,
                    sampling_unit: "hour",
                    sampling_statistic: {
                        "median": "p50",
                    }
                })
            },
        })
    }
})

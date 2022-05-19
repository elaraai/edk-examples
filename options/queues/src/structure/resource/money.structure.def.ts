// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Resource } from "@elaraai/edk/lib"

export default ELARA.ResourceStructureSchema({
    concept: "Money",
    instances: {
        cash: Resource({
            properties: {
                balance: ELARA.Temporal({
                    initial_value: 0,
                    sampling_unit: "hour",
                    sampling_statistic: {
                        "median":'p50',
                        "upper": 'p85',
                        "lower": 'p15'
                    },
                    objective: ELARA.Property("balance", "float")
                })
            }
        })
    }
})

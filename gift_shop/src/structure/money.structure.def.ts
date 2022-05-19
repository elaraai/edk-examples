// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Temporal } from "@elaraai/edk/lib"

export default ELARA.ResourceStructureSchema({
    concept: "Money",
    instances: {
        Cheque: {
            properties: {
                Balance: Temporal({
                    initial_value: 0,
                    sampling_unit: 'hour',
                    objective: ELARA.Property("Balance", "float"),
                    sampling_statistic: {
                        "Median": 'p50',
                        "Upper": 'p85',
                        "Lower": 'p15',
                    }
                })
            }
        }
    }
})

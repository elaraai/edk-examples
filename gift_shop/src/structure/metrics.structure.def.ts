// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { NewDict, Temporal } from "@elaraai/edk/lib"

export default ELARA.ResourceStructureSchema({
    concept: "Metrics",
    instances: {
        Balance: {
            properties: {
                WeeklySalesQty: Temporal({
                    initial_value: NewDict('float'),
                    sampling_unit: 'week',
                })
            }
        }
    }
})

// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import { Resource, ResourceStructureSchema, Temporal } from "@elaraai/edk/lib"

export default ResourceStructureSchema({
    concept: 'cash',
    instances: {
        account: Resource({
            properties: {
                balance: Temporal({
                    initial_value: 1000.00,
                    sampling_unit: "day",
                    sampling_statistic: {
                        "median": "p50",
                    }
                }),
            }
        })
    }
})

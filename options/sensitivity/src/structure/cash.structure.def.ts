// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
  Property,
  Resource,
  ResourceStructureSchema,
  Temporal,
} from '@elaraai/edk/lib';

export default ResourceStructureSchema({
    concept: 'cash',
    instances: {
        account: Resource({
            properties: {
                balance: Temporal({
                    initial_value: 1000.00,
                    objective: Property("balance", "float"),
                    sampling_unit: "hour",
                    sampling_statistic: {
                        "median": "p50",
                        "lower": "p15",
                        "upper": "p85"
                    }
                }),
            },
        })
    }
})

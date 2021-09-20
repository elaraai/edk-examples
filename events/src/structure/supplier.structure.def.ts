// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Temporal } from "@elaraai/edk/lib"

import suppliers_source from '../../gen/suppliers.source'

const suppliers = suppliers_source.output

export default ELARA.ResourceStructureSchema({
    concept: "supplier",
    mapping: {
        input_table: suppliers,
        properties: {
            name: suppliers.fields.name,
            terms: suppliers.fields.terms,
            subcontractors: suppliers.fields.subcontractors,
            rate: suppliers.fields.rate,
            work: Temporal({
                initial_value: 0.00,
                sampling_unit: "day",
                sampling_statistic: {
                    "median": "p50",
                }
            })
        }
    }
})

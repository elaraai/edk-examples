// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import staff_source from "../../../gen/staff.source"

export default ELARA.ResourceStructureSchema({
    concept: "Employees",
    mapping: {
        input_table: staff_source.output,
        marker: staff_source.output.fields.ID,
        properties: {
            type: staff_source.output.fields.Type,
            next_available_time: ELARA.Temporal({
                initial_value: new Date('2021-01-01T00:00:00.000Z'),
            }),
            availablity: ELARA.Temporal({
                initial_value: 1n,
            }),
        }
    }
})

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import work_source from "../../../gen/work.source"

export default ELARA.ResourceStructureSchema({
    concept: "Queue Items",
    mapping: {
        input_table: work_source.output,
        marker: work_source.output.fields.ID,
        properties: {
            id : work_source.output.fields.ID,
            queue: work_source.output.fields.Queue,
            arrival_time: work_source.output.fields.ArrivalTime,
            service_time: ELARA.Temporal({
                initial_value: work_source.output.fields.ServiceTime
            }),
        }
    }
})

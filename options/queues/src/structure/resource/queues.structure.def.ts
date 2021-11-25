// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';

import queue_source from '../../../gen/queues.source';

export default ELARA.ResourceStructureSchema({
    concept: "Queues",
    mapping: {
        input_table: queue_source.output,
        marker: queue_source.output.fields.Queue_Name,
        properties: {
            queue_items: ELARA.Temporal({
                initial_value: ELARA.NewSet(),
            }),
            new_queue_arrivals: ELARA.Temporal({
                initial_value: ELARA.NewSet(),
            }),
            queue_arrivals: ELARA.Temporal({
                initial_value: 0n,
                sampling_unit: "hour"
            }),
            new_sales_ids: ELARA.Temporal({
                initial_value: ELARA.NewSet(),
            }),
            sales_qty: ELARA.Temporal({
                initial_value: 0n,
                sampling_unit: "hour"
            }),
            queue_size: ELARA.Temporal({
                initial_value: 0,
                sampling_unit: "hour",
            }),
            employees: ELARA.Temporal({
                initial_value: ELARA.NewSet(),
            }),
        }
    }
})

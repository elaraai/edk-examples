// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  NewSet,
  ProcessMapping,
} from '@elaraai/edk/lib';

import availability_source from '../../../gen/availability.source';
import queues from '../../../gen/queues.structure';

const availability = availability_source.output

export default ELARA.ProcessStructureSchema({
    concept: "Availability",
    mapping: ProcessMapping({
        input_table: availability,
        date: availability.fields.Time,
        marker: availability.fields.ID,
        properties: { 
            predict: availability.fields.Predict,
        },
        events: {
            reset_queue_staff: {
                property: queues.properties.employees,
                marker: availability.fields.Queue,
                value: NewSet()
            },
        },
    })
})
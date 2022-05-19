// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  GetProperty,
  NewSet,
  ProcessMapping,
  Property,
  SetDiff,
  Subtract,
} from '@elaraai/edk/lib';

import queues from '../../../gen/queues.structure';
import service_begin from '../../../gen/service_begin.structure';
import work_source from '../../../gen/work.source';

export default ELARA.ProcessStructureSchema({
    concept: "Service End",
    mapping: ProcessMapping({
        input_table: work_source.output,
        date: Property("dequeue_time", "datetime"),
        marker: work_source.output.fields.ID,
        properties: {
            predict: work_source.output.fields.Predict,
            queue: work_source.output.fields.Queue,
            dequeue_item: GetProperty({
                property: service_begin.properties.arrival_id,
                marker: work_source.output.fields.ID,
            }),
            dequeue_time: GetProperty({
                property: service_begin.properties.dequeue_time,
                marker: work_source.output.fields.ID,
            }),
            queue_items: GetProperty({
                property: queues.properties.queue_items,
                marker: Property("queue", "string")
            }),
            queue_size: GetProperty({
                property: queues.properties.queue_size,
                marker: Property("queue", "string")
            })
        },
        events: {
            dequeue: {
                property: queues.properties.queue_items,
                marker: Property("queue", "string"),
                value: SetDiff(
                    Property("queue_items", "set"),
                    NewSet(Property("dequeue_item", "string"))
                ),
            },
            dec_queue: {
                property: queues.properties.queue_size,
                marker: Property("queue", "string"),
                value: Subtract(
                    Property("queue_size", "float"),
                    1
                ),
            },
            
        }
    })
})

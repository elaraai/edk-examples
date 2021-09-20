// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Add, GetProperty, NewSet, ProcessMapping, Property, Union } from "@elaraai/edk/lib"

import queues from "../../../gen/queues.structure"
import work_source from "../../../gen/work.source"

export default ELARA.ProcessStructureSchema({
    concept: "Arrival",
    mapping: ProcessMapping({
        input_table: work_source.output,
        date: work_source.output.fields.ArrivalTime,
        marker: work_source.output.fields.ID,
        properties: {
            predict: work_source.output.fields.Predict,
            queue: work_source.output.fields.Queue,
            id: work_source.output.fields.ID,
            queue_items: GetProperty({
                property: queues.properties.queue_items,
                marker: Property("queue", "string")
            }),
            new_queue_arrivals: GetProperty({
                property: queues.properties.new_queue_arrivals,
                marker: Property("queue", "string")
            }),
            queue_size: GetProperty({
                property: queues.properties.queue_size,
                marker: Property("queue", "string")
            }),
            arrival_time: work_source.output.fields.ArrivalTime,
        },
        events: {
            // add to the appropriate queue
            enqueue: {
                property: queues.properties.queue_items,
                marker: work_source.output.fields.Queue,
                value: Union(
                    Property("queue_items", "set"),
                    NewSet(work_source.output.fields.ID)
                ),
            },
            // add the the set of new arrivals
            new_arrivals: {
                property: queues.properties.new_queue_arrivals,
                marker: work_source.output.fields.Queue,
                value: Union(
                    Property("new_queue_arrivals", "set"),
                    NewSet(work_source.output.fields.ID)
                ),
            },
            update_queue_size: { 
                property: queues.properties.queue_size,
                marker: work_source.output.fields.Queue,
                value: Add(
                    Property("queue_size", "float"),
                    1
                ),
            }
        }
    })
})

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { AggregateOperation, CollectSet, DateKey, Floor, StringJoin, Unique, Variable } from "@elaraai/edk/lib";

import availability_source from "../../gen/availability.source"
const availability = availability_source.output

// to calculate how employees were allocated to queues
export default ELARA.PipelineSchema({
    name: "Allocations",
    input_table: availability,
    operations: [
        AggregateOperation({
            group_field: Variable('AllocationKey', 'string'),
            group_value: StringJoin`${DateKey(availability.fields.Time, 'hour')}.${availability.fields.Queue}` ,
            aggregations: {
                Queue: Unique(availability.fields.Queue),
                Date: Unique(Floor(availability.fields.Time, 'hour')),
                EmployeeIDs: CollectSet(availability.fields.StaffID),
                Predict: Unique(availability.fields.Predict),
            }
        }),
    ],
})

// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { AggregateOperation, CollectDictSum, CollectSet, DateKey, DictType, DisaggregateOperation, Floor, JoinOperation, StringJoin, Unique, Variable } from "@elaraai/edk/lib";

import availability_source from "../../gen/availability.source"
import allocations_pipeline from "../../gen/allocations.pipeline"

const availability = availability_source.output
const allocations = allocations_pipeline.output_table

// to calculate how effort is delegated to the different queues by type
export default ELARA.PipelineSchema({
    name: "Delegations",
    input_table: availability,
    operations: [
        AggregateOperation({
            group_field: Variable('AllocationKey', 'string'),
            group_value: DateKey(availability.fields.Time, 'hour'),
            aggregations: {
                Queues: CollectSet(availability.fields.Queue),
                Date: Unique(Floor(availability.fields.Time, 'hour')),
                EmployeeTypes: CollectDictSum(StringJoin`${availability.fields.Queue}.${availability.fields.Type}`, 1),
                Predict: Unique(availability.fields.Predict),
            }
        }),
        DisaggregateOperation({
            collection: Variable('Queues','set'),
            value: Variable('Queue','string'),
            keep_all: true,
            primary_key: StringJoin`${DateKey(Variable('Date','datetime'), 'hour')}.${availability.fields.Queue}`,
            selections: {
                Queue: Variable('Queue','string'),
                Date: Variable('Date','datetime'),
                EmployeeTypes: Variable('EmployeeTypes', DictType('float')),
                Predict: Variable('Predict', 'boolean'),
            }
        }),
        JoinOperation({
            target_key: StringJoin`${DateKey(Variable('Date','datetime'), 'hour')}.${Variable('Queue','string')}`,
            source_table: allocations,
            source_key: StringJoin`${DateKey(allocations.fields.Date, 'hour')}.${allocations.fields.Queue}`,
            source_selections: {
                EmployeeIDs: allocations.fields.EmployeeIDs
            }
        })
    ],
})

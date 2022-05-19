// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Const, DistributionOperation, JoinOperation, Partition, PartitionPerMonth, PipelineSchema } from "@elaraai/edk/lib"

import rows_source from "../../gen/rows.source"
import clock_source from "../../gen/clock.source"

export default ELARA.mergeSchemas(
    PipelineSchema({
        name: "Rows",
        input_table: rows_source.output,
        operations: [
            JoinOperation({
                source_table: clock_source.output,
                source_key: Const(""),
                target_key: Const("")
            }),
        ],
        partitions: {
            Group: Partition({ partition_key: rows_source.output.fields.Group }),
            Month: PartitionPerMonth(rows_source.output.fields["Date 1"])
        },
    }),
    PipelineSchema({
        name: "Single",
        input_table: rows_source.output,
        operations: [
            JoinOperation({
                source_table: clock_source.output,
                source_key: Const(""),
                target_key: Const("")
            }),
        ],
        partitions: {
            Rows: Partition({ partition_key: rows_source.output.primary_key }),
        },
    }),
    PipelineSchema({
        name: "Distribution",
        input_table: rows_source.output,
        operations: [
            JoinOperation({
                source_table: clock_source.output,
                source_key: Const(""),
                target_key: Const("")
            }),
            DistributionOperation({
                group_key: rows_source.output.fields["String 1"],
                samples: rows_source.output.fields["Number 1"],
                n_bins: 200n
            })
        ],
    }),
)

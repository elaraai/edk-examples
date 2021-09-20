// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { DistributionOperation, PipelineSchema } from "@elaraai/edk/lib"

import rows_source from "../../gen/rows.source"

export default ELARA.Schema(
    PipelineSchema({
        name: "Distribution",
        input_table: rows_source.output,
        operations: [
            DistributionOperation({
                group_key: rows_source.output.fields["String 1"],
                samples: rows_source.output.fields["Number 1"],
                n_bins: 200n
            })
        ],
    })
)

// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { DistributionOperation } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: "Distribution",
    input_table: test_one.output,
    operations: [
        DistributionOperation({
            samples: test_one.output.fields.number,
            group_key: test_one.output.fields.boolean,
            distribution: 'GaussianKDE',
            normalization: 'PercentDensity',
            n_bins: 10n
        })
    ],
})

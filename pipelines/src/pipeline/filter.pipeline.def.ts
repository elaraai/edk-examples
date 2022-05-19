// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Greater } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Filter',
    input_table: test_one.output,
    operations: [
        ELARA.FilterOperation({
            predicate: Greater(test_one.output.fields.number, 10)
        })
    ],
})

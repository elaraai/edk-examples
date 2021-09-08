// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { OffsetOperation, Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Offset',
    input_table: test_one.output,
    operations: [
        OffsetOperation({
            offset: -1,
            group_key: test_one.output.fields.boolean,
            sort_key: test_one.output.fields.date,
            offset_exists: Variable("previous_exists", "boolean"),
            offset_selections: {
                previous_exists: Variable("previous_exists", "boolean"),
                previous_string: test_one.output.fields.string,
            },
        })
    ],
})

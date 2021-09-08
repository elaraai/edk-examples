// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"
import test_two from "../../gen/test_two.source"

export default ELARA.PipelineSchema({
    name: 'Join',
    input_table: test_one.output,
    operations: [
        ELARA.JoinOperation({
            source_table: test_two.output,
            source_key: test_two.output.fields.string,
            target_key: test_one.output.fields.string,
            source_selections: {
                string: test_two.output.fields.string,
                date: test_two.output.fields.date,
                number: test_two.output.fields.number,
                integer: test_two.output.fields.integer,
                'boolean': test_two.output.fields['boolean'],
            },
            target_selections: {
                target_string: test_one.output.fields.string,
                target_date: test_one.output.fields.date,
                target_number: test_one.output.fields.number,
                target_integer: test_one.output.fields.integer,
                target_boolean: test_one.output.fields['boolean']
            },
            join_type: 'Inner',
            output_key: Variable("string", 'string')
        }),
    ],
})

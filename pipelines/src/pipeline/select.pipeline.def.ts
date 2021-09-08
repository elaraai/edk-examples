// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Multiply, SelectOperation, StringJoin, Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: 'Select',
    input_table: test_one.output,
    operations: [
        SelectOperation({
            keep_all: false,
            selections: {
                multiply: Multiply(test_one.output.fields.number, 2),
                'String Join': StringJoin`${test_one.output.fields.string}.${ELARA.Print(test_one.output.fields.date, 'DD/MM/YYYY')}`
            },
            primary_key: Variable('String Join', 'string')
        })
    ],
})

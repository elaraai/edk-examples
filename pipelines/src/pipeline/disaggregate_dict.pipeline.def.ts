// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { DisaggregateOperation, StringJoin, Variable } from "@elaraai/edk/lib"

import test_one from "../../gen/test_one.source"

export default ELARA.PipelineSchema({
    name: "Disaggregate Dict",
    input_table: test_one.output,
    operations: [
        DisaggregateOperation({
            collection: test_one.output.fields.Dict,
            value: Variable("value", "float"),
            key: Variable("key", "string"),
            keep_all: true,
            selections: {
                "Key": Variable("key", "string"),
                "Value": Variable("value", "float"),
            },
            primary_key: StringJoin`${test_one.output.fields.string}. ${Variable("Key", "string")}`
        }),
    ],
})

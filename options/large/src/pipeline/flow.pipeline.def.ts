// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import { Add, AddDuration, Convert, Divide, EastFunction, GreaterEqual, Modulo, Multiply, PipelineSchema, Print, SelectOperation, Variable } from "@elaraai/edk/lib"

import range_source from "../../gen/range.source"

const range = range_source.output

export function LCG(x: EastFunction<"integer">) {
    return Modulo(Add(Multiply(x, 1664525n), 1013904223n), BigInt(Math.pow(2, 32)))
}

export function Rand(seed: EastFunction<"float">) {
    return Divide(LCG(LCG(LCG(LCG(LCG(Convert(Multiply(seed, 113), "integer")))))), Math.pow(2, 32))
}

export default PipelineSchema({
    name: "Flow",
    input_table: range,
    operations: [
        SelectOperation({
            selections: {
                index: Convert(range.fields.value, 'integer'),
                date: AddDuration(new Date("2022-01-01T12:00:00.000Z"), range.fields.value, "hour"),
                flow: Add(9.5, Rand(range.fields.value)),
                future: GreaterEqual(range.fields.value, 0),
            },
            primary_key: Print(Variable("date", "datetime"))
        }),
    ],
})

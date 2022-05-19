// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Const, Environment, Equal, HttpOperation, IfElse, mapValues, Parse, RestApiRequest, RestApiResponse, Struct, StructType, Variable } from "@elaraai/edk/lib"

import test_one_source from "../../gen/test_one.source"

const response_headers_type = StructType({
    'content-type': 'string',
});

const test_one = test_one_source.output

export default ELARA.PipelineSchema({
    name: "Http",
    input_table: test_one,
    operations: [
        HttpOperation({
            request: RestApiRequest({
                url: Environment('REQUEST_URL'),
                method: 'POST',
                accept: 'application/json',
                content: 'application/json',
                body: Struct(test_one.fields),
                delay_ms: IfElse(
                    Equal(Variable('status_code', 'integer'), 400n),
                    Const(62000n),
                    Const(400n)
                ),            
            }),
            response: RestApiResponse({
                status_code_variable: Variable("status_code", 'integer'),
                status_text_variable: Variable("status_text", 'string'),
                headers: Parse(Variable("headers", response_headers_type)),
                headers_variable: Variable("headers", response_headers_type),
                body: Parse(Variable("body", StructType(mapValues(test_one.fields, f => f.type)))),
                body_variable: Variable("body", StructType(mapValues(test_one.fields, f => f.type))),
                value: Struct({
                    body: Variable("body", StructType(mapValues(test_one.fields, f => f.type))),
                    headers:  Variable("headers", response_headers_type),
                    status_code: Variable("status_code", 'integer'),
                    status_text: Variable("status_text", 'string'),
                })
            })
        })
    ],
})

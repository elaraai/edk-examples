// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import { RangeSourceSchema, Variable } from '@elaraai/edk/lib';

export default RangeSourceSchema({
    name: "Range",
    start: -50_000,
    stop: 10,
    step: 1,
    field: Variable('value', 'float'),
})

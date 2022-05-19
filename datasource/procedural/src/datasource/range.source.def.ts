// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.RangeSourceSchema({
    name: 'Range',
    start: 1,
    stop: 10,
    step: 2,
    field: ELARA.Variable('value', 'float')
})

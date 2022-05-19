// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.ClockSourceSchema({
    name: "Clock",
    past_cycles: 0,
    future_cycles: 0,
    period: 100,
    unit: 'second',
    date_variable: ELARA.Variable("poll_datetime", 'datetime'),
})

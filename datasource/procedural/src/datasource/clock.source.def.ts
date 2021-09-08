// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.ClockSourceSchema({
    name: 'Clock',
    period: 1,
    unit: 'hour',
    date_variable: ELARA.Variable('Tick', 'datetime'),
    cycle_variable: ELARA.Variable('HourlyCycle', 'integer'),
    past_cycles: 24 * 7 * 4,
    future_cycles: 24 * 7 * 4,
    timezone_hours: 5, // 0 -> 19:00
    selections: {
        Iso: ELARA.Print(ELARA.Variable('Tick', 'datetime')),
    }
})

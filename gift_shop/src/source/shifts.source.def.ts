// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Shifts",
    uri: 'file://files/shifts.csv',
    primary_key: ELARA.Variable("ShiftID", 'string'),
    selections: {
        ShiftID: ELARA.Parse(ELARA.Variable("ShiftID", 'string')),
        StaffMember: ELARA.Parse(ELARA.Variable("StaffMember", 'string')),
        Start: ELARA.Parse(ELARA.Variable("Start", 'datetime')),
        End: ELARA.Parse(ELARA.Variable("End", 'datetime')),
        Rate: ELARA.Parse(ELARA.Variable("Rate", 'float')),
        RosterID: ELARA.Parse(ELARA.Variable("RosterID", 'string')),
    },
})

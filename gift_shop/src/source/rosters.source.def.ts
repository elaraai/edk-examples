// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Rosters",
    uri: 'file://files/rosters.csv',
    primary_key: ELARA.Variable("RosterID", 'string'),
    selections: {
        RosterID: ELARA.Parse(ELARA.Variable("RosterID", 'string')),
        StaffMember: ELARA.Parse(ELARA.Variable("StaffMember", 'string')),
        Start: ELARA.Parse(ELARA.Variable("Start", 'datetime')),
        End: ELARA.Parse(ELARA.Variable("End", 'datetime')),
    },
})

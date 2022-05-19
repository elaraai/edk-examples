// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Staff",
    uri: "file://data/staff.csv",
    primary_key: ELARA.Variable("ID", 'string'),
    selections: {
        ID: ELARA.Parse(ELARA.Variable("ID", 'string')),
        Type: ELARA.Parse(ELARA.Variable("Type", 'string')),
    },
})

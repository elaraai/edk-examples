// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Availability",
    uri: 'file://data/availability.csv',
    primary_key: ELARA.Variable("ID", 'string'),
    selections: {
        ID: ELARA.Parse(ELARA.Variable("ID", 'string')),
        Time: ELARA.Parse(ELARA.Variable("Time", 'datetime')),
        StaffID: ELARA.Parse(ELARA.Variable("StaffID", 'string')),
        Type: ELARA.Parse(ELARA.Variable("Type", 'string')),
        Queue: ELARA.Parse(ELARA.Variable("Queue", 'string')),
        Predict: ELARA.Parse(ELARA.Variable("Predict", 'boolean')),
    },
})

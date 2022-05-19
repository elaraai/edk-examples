// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Work",
    uri: 'file://data/work.csv',
    primary_key: ELARA.Variable("ID", 'string'),
    selections: {
        ID: ELARA.Parse(ELARA.Variable("ID", 'string')),
        Queue: ELARA.Parse(ELARA.Variable("Queue", 'string')),
        ArrivalTime: ELARA.Parse(ELARA.Variable("ArrivalTime", 'datetime')),
        ServiceTime: ELARA.Parse(ELARA.Variable("ServiceTime", 'datetime')),
        Duration: ELARA.Parse(ELARA.Variable("Duration", 'float')),
        StaffID: ELARA.Parse(ELARA.Variable("StaffID", 'string')),
        Predict: ELARA.Parse(ELARA.Variable("Predict", 'boolean')),
    },
})

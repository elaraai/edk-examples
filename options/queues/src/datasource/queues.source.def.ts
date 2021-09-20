// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Queues",
    uri: 'file://data/queues.csv',
    primary_key: ELARA.Variable("Queue_Name", 'string'),
    selections: {
        Queue_Name: ELARA.Parse(ELARA.Variable("Queue_Name", 'string')),
    },
})

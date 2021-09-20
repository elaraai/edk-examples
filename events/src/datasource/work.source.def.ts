// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.JsonSourceSchema({
    name: "Work",
    uri: 'file://files/work.jsonl',
    primary_key: ELARA.Variable("id", 'string'),
    selections: {
        id: ELARA.Parse(ELARA.Variable("id", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        subcontractor: ELARA.Parse(ELARA.Variable("subcontractor", 'string')),
        supplier: ELARA.Parse(ELARA.Variable("supplier", 'string')),
        hours: ELARA.Parse(ELARA.Variable("hours", 'float')),
    },
})

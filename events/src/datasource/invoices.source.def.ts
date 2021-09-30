// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.JsonSourceSchema({
    name: "Invoices",
    uri: 'file://files/invoices.jsonl',
    primary_key: ELARA.Variable("id", 'string'),
    selections: {
        id: ELARA.Parse(ELARA.Variable("id", 'string')),
        date: ELARA.Parse(ELARA.Variable("date", 'datetime')),
        supplier: ELARA.Parse(ELARA.Variable("supplier", 'string')),
    },
})

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.JsonSourceSchema({
    name: "Suppliers",
    uri: 'file://files/suppliers.jsonl',
    primary_key: ELARA.Variable("name", 'string'),
    selections: {
        name: ELARA.Parse(ELARA.Variable("name", 'string')),
        terms: ELARA.Parse(ELARA.Variable("terms", 'float')),
        subcontractors: ELARA.Parse(ELARA.Variable("subcontractors", 'set')),
        rate: ELARA.Parse(ELARA.Variable("rate", 'float')),
    },
})

// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.JsonSourceSchema({
    name: "Sales",
    uri: 'file://files/sales.jsonl',
    primary_key: ELARA.Print(ELARA.Variable("ID", 'integer')),
    selections: {
        Cost: ELARA.Parse(ELARA.Variable("Cost", 'float')),
        Profit: ELARA.Parse(ELARA.Variable("Profit", 'float')),
        Predict: ELARA.Parse(ELARA.Variable("Predict", 'boolean')),
        Date: ELARA.Parse(ELARA.Variable("Date", 'datetime')),
        Price: ELARA.Parse(ELARA.Variable("Price", 'float')),
        Qty: ELARA.Parse(ELARA.Variable("Qty", 'float')),
        ID: ELARA.Parse(ELARA.Variable("ID", 'integer')),
    },
})

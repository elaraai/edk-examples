// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Purchases",
    uri: ELARA.Const("files/purchases.csv"),
    primary_key: ELARA.Variable("SupplyID", 'string'),
    selections: {
        SupplyID: ELARA.Parse(ELARA.Variable("SupplyID", 'string')),
        Item: ELARA.Parse(ELARA.Variable("Item", 'string')),
        Qty: ELARA.Parse(ELARA.Variable("Qty", 'integer')),
        Date: ELARA.Parse(ELARA.Variable("Date", 'datetime')),
        Cost: ELARA.Parse(ELARA.Variable("Cost", 'float')),
    },
})

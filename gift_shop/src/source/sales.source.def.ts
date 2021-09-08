// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.CsvSourceSchema({
    name: "Sales",
    uri: ELARA.Const("files/sales.csv"),
    primary_key: ELARA.Variable("SaleID", 'string'),
    selections: {
        SaleID: ELARA.Parse(ELARA.Variable("SaleID", 'string')),
        Product: ELARA.Parse(ELARA.Variable("Product", 'string')),
        Date: ELARA.Parse(ELARA.Variable("Date", 'datetime')),
        Price: ELARA.Parse(ELARA.Variable("Price", 'float')),
    },
})

// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.ExcelSourceSchema({
    name: "Sales",
    uri: 'file://files/sales.xlsx',
    worksheets: {
        Suppliers: {
            primary_key: ELARA.Variable("Supplier", 'string'),
            selections: {
                Supplier: ELARA.Parse(ELARA.Variable("Supplier", 'string')),
                Cost: ELARA.Parse(ELARA.Variable("Cost", 'float')),
            },
        },
        Sales: {
            primary_key: ELARA.Print(ELARA.Variable("Sale", 'integer')),
            selections: {
                Sale: ELARA.Parse(ELARA.Variable("Sale", 'integer')),
                Date: ELARA.Parse(ELARA.Variable("Date", 'datetime')),
                Supplier: ELARA.Parse(ELARA.Variable("Supplier", 'string')),
                Qty: ELARA.Parse(ELARA.Variable("Qty", 'integer')),
                Refund: ELARA.Parse(ELARA.Variable("Refund", 'boolean')),
                Price: ELARA.Parse(ELARA.Variable("Price", 'float')),
                Tags: ELARA.Parse(ELARA.Variable("Tags", 'set')),
            },
        },
    }
})

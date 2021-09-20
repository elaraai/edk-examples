// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import { AgentStructureSchema } from "@elaraai/edk/lib"

import sales_source from "../../gen/sales.source"

const suppliers  = sales_source.outputs.Suppliers.table

export default AgentStructureSchema({
    concept: "supplier",
    mapping: {
        input_table: suppliers,
        properties: {
            Cost: suppliers.fields.Cost
        }
    }
})

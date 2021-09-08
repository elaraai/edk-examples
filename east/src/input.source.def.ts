// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

import { Const, Variable } from '@elaraai/edk/lib';

export default ELARA.ArraySourceSchema({
    name: "input",
    rows: [
        { // A single row
            Min: 5n,
            Max: 10n,
        } 
    ],
    selections: {
        Min: Variable("Min", "integer"),
        Max: Variable("Max", "integer"),
    },
    primary_key: Const(""),
})

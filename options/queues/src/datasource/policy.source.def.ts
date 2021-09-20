// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"


export default ELARA.CsvSourceSchema({
    name: "Policy",
    uri: 'file://data/policy.csv',
    primary_key: ELARA.Variable("ID", 'string'),
    selections: {
        ID: ELARA.Parse(ELARA.Variable("ID", 'string')),
        Queue: ELARA.Parse(ELARA.Variable("Queue", 'string')),
        Type: ELARA.Parse(ELARA.Variable("Type", 'string')),
        Bias: ELARA.Parse(ELARA.Variable("Bias", 'float')),
        BiasMin: ELARA.Parse(ELARA.Variable("BiasMin", 'float')),
        BiasMax: ELARA.Parse(ELARA.Variable("BiasMax", 'float')),
        Load: ELARA.Parse(ELARA.Variable("Load", 'float')),
        LoadMin: ELARA.Parse(ELARA.Variable("LoadMin", 'float')),
        LoadMax: ELARA.Parse(ELARA.Variable("LoadMax", 'float')),
    },
})

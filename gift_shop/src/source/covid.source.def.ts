// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

export default ELARA.CsvSourceSchema({
    name: "Covid",
    uri: 'file://files/covid.csv',
    primary_key: ELARA.Print(ELARA.Variable("Date", 'datetime')),
    selections: {
        Date: ELARA.Parse(ELARA.Variable("Date", 'datetime')),
        CovidCases: ELARA.Parse(ELARA.Variable("CovidCases", 'integer')),
    },
})

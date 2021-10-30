// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { GenericFunction, Property, ToDateTime } from '@elaraai/edk/lib';

import inputSource from '../gen/input.source'

const input = inputSource.output

export default ELARA.ProcessStructureSchema({
    concept: "process",
    mapping: {
        input_table: input,
        date: new Date(),
        properties: {
            ToDateTime1Mapped: ToDateTime("2021-05-08T09:00:00.000Z"),
            ToDateTime1Simulated: GenericFunction({ expression: ToDateTime("2021-05-08T09:00:00.000Z") }),
            ToDateTime2Mapped: ToDateTime("2021", "YYYY"),
            ToDateTime2Simulated: GenericFunction({ expression: ToDateTime("2021", "YYYY"), }),
            RangeMapped: ELARA.Range(input.fields.Min, input.fields.Max),
            Min: input.fields.Min,
            Max: input.fields.Max,
            RangeSimulated: GenericFunction({ expression: ELARA.Range(Property("Min", "integer"), Property("Max", "integer")) }),
            SqrtMapped: ELARA.Sqrt(4.0),
            Four: 4.0,
            SqrtSimulated: ELARA.Sqrt(Property("Four", "float")),
            LogMapped: ELARA.Log(1.0),
            One: 1.0,
            LogSimulated: ELARA.Log(Property("One", "float")),
            ExpMapped: ELARA.Exp(0.0),
            Zero: 0.0,
            ExpSimulated: ELARA.Exp(Property("Zero", "float")),
            PowMapped: ELARA.Pow(2.0, 3.0),
            Two: 2.0,
            Three: 3.0,
            PowSimulated: ELARA.Pow(Property("Two", "float"), Property("Three", "float")),
            CaseString: "Français - Éclair",
            LowerCaseMapped: ELARA.LowerCase("Français - Éclair"),
            LowerCaseSimulated: ELARA.LowerCase(Property("CaseString", "string")),
            UpperCaseMapped: ELARA.UpperCase("Français - Éclair"),
            UpperCaseSimulated: ELARA.UpperCase(Property("CaseString", "string")),
        },
        events: {}
    }
})

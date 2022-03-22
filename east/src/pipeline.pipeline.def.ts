// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
  Add,
  Const,
  DictType,
  Exp,
  Get,
  Insert,
  Log,
  LowerCase,
  Modulo,
  NewDict,
  PipelineSchema,
  Pow,
  Print,
  Range,
  Reduce,
  SelectOperation,
  Sqrt,
  ToDateTime,
  ToDict,
  UpperCase,
  Variable,
} from '@elaraai/edk/lib';

import input_source from '../gen/input.source';

const input = input_source.output

export default PipelineSchema({
    name: "pipeline",
    input_table: input,
    operations: [
        SelectOperation({
            selections: {
                ToDateTime1: ToDateTime("2021-05-08T09:00:00.000Z"),
                ToDateTime2: ToDateTime("2021", "YYYY"),
                Range: Range(5n, 10n),
                Sqrt: Sqrt(4.0),
                Log: Log(1.0),
                Exp: Exp(0.0),
                Pow: Pow(2.0, 3.0),
                LowerCase: LowerCase("Français - Éclair"),
                UpperCase: UpperCase("Français - Éclair"),
                Get1: Get(Const(new Map([["a", "A"], ["b", "B"]])), Const("a")),
                Get2: Get(Const(new Map([["a", "A"], ["b", "B"]])), Const("c")),
                Get3: Get(Const(new Map([["a", "A"], ["b", "B"]])), Const("c"), Const("C")),
                Get4: Get(Const(["a", "b"]), Const(0n)),
                Get5: Get(Const(["a", "b"]), Const(2n)),
                Get6: Get(Const(["a", "b"]), Const(2n), Const("c")),
                Reduce: Reduce(
                    Range(1n, 10000n),
                    Insert(
                        Variable("Previous", DictType("integer")),
                        Print(Modulo(Variable("Index", "integer"), 100n)),
                        Add(
                            Get(Variable("Previous", DictType("integer")), Print(Modulo(Variable("Index", "integer"), 100n)), 0n),
                            Variable("Value", "integer"),
                        ),
                    ),
                    NewDict("integer"),
                    Variable("Previous", DictType("integer")),
                    Variable("Value", "integer"),
                    Variable("Index", "integer"),
                ),
                ToDict: ToDict(
                    Range(1n, 10000n),
                    Add(
                        Variable("Previous", "integer"),
                        Variable("Value", "integer"),
                    ),
                    Print(Modulo(Variable("Index", "integer"), 100n)),
                    Variable("Value", "integer"),
                    Variable("Index", "integer"),
                    Variable("Previous", "integer"),
                    0n,
                ),
                ToDictSimple: ToDict(
                    Range(1n, 10000n),
                    Variable("Value", "integer"),
                    Print(Modulo(Variable("Index", "integer"), 100n)),
                    Variable("Value", "integer"),
                    Variable("Index", "integer"),
                )
            }
        })
    ],
})

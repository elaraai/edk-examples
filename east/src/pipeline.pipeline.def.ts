// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
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
  Multiply,
  NewDict,
  NewVariant,
  PipelineSchema,
  Pow,
  Print,
  Range,
  Reduce,
  SelectOperation,
  Sqrt,
  Switch,
  ToDateTime,
  ToDict,
  UpperCase,
  Variable,
  Variant,
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
                ),
                NewVariant1: NewVariant({ "Some": "float", "None": "null" }, "Some", 3.14),
                NewVariant2: NewVariant({ "Some": "float", "None": "null" }, "None"),
                NewVariant3: NewVariant({ "Some": DictType("integer"), "None": "null" }, "Some", new Map<string, bigint>([["a", 1n], ["b", 2n], ["c", 3n]])),
                Switch1: Switch(
                    Const(Variant({ "Some": "float", "None": "null" }, "Some", 1)),
                    {
                        Some: Multiply(Variable("x", "float"), 2),
                        None: Const(0),
                    },
                    "x"
                ),
                Switch2: Switch(
                    Const(Variant({ "Some": "float", "None": "null" }, "None")),
                    {
                        Some: Multiply(Variable("x", "float"), 2),
                        None: Const(0),
                    },
                    "x"
                ),
                Switch3: Switch(
                    Const(Variant({ "Some": "float", "None": "null" }, "Some", 1)),
                    {
                        Some: Const(true),
                        None: Const(false),
                    },
                ),
                Switch4: Switch(
                    Const(Variant({ "Some": "float", "None": "null" }, "None")),
                    {
                        Some: Const(true),
                        None: Const(false),
                    },
                ),
            }
        })
    ],
})

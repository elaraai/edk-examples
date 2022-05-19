// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Add,
  ArrayType,
  Const,
  DictType,
  GenericFunction,
  Get,
  IfElse,
  Insert,
  Modulo,
  Multiply,
  NewDict,
  NewVariant,
  Not,
  Null,
  Print,
  Property,
  Range,
  Reduce,
  Switch,
  ToDateTime,
  ToDict,
  Variable,
  Variant,
} from '@elaraai/edk/lib';

import inputSource from '../gen/input.source';

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
            Get1Mapped: Get(Const(new Map([["a", "A"], ["b", "B"]])), Const("a")),
            Get2Mapped: Get(Const(new Map([["a", "A"], ["b", "B"]])), Const("c")),
            Get3Mapped: Get(Const(new Map([["a", "A"], ["b", "B"]])), Const("c"), Const("C")),
            Get4Mapped: Get(Const(["a", "b"]), Const(0n)),
            Get5Mapped: Get(Const(["a", "b"]), Const(2n)),
            Get6Mapped: Get(Const(["a", "b"]), Const(2n), Const("C")),
            Dict: new Map([["a", "A"], ["b", "B"]]),
            Array: ["a", "b"],
            Get1Simulated: Get(Property("Dict", DictType("string")), Const("a")),
            Get2Simulated: Get(Property("Dict", DictType("string")), Const("c")),
            Get3Simulated: Get(Property("Dict", DictType("string")), Const("c"), Const("C")),
            Get4Simulated: Get(Property("Array", ArrayType("string")), Const(0n)),
            Get5Simulated: Get(Property("Array", ArrayType("string")), Const(2n)),
            Get6Simulated: Get(Property("Array", ArrayType("string")), Const(2n), Const("c")),
            ReduceMapped: Reduce(
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
            ToDictMapped: ToDict(
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
            ToDictSimpleMapped: ToDict(
                Range(1n, 10000n),
                Variable("Value", "integer"),
                Print(Modulo(Variable("Index", "integer"), 100n)),
                Variable("Value", "integer"),
                Variable("Index", "integer"),
            ),
            Range: Range(1n, 10000n),
            ReduceSimulated: Reduce(
                Property("Range", ArrayType("integer")),
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
            ToDictSimulated: ToDict(
                Property("Range", ArrayType("integer")),
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
            ToDictSimpleSimulated: ToDict(
                Property("Range", ArrayType("integer")),
                Variable("Value", "integer"),
                Print(Modulo(Variable("Index", "integer"), 100n)),
                Variable("Value", "integer"),
                Variable("Index", "integer"),
            ),
            True: true,
            Pi: 3.14,
            Null: Null("null"),
            NewVariant1Mapped: NewVariant({ "Some": "float", "None": "null" }, "Some", 3.14),
            NewVariant2Mapped: NewVariant({ "Some": "float", "None": "null" }, "None"),
            NewVariant3Mapped: NewVariant({ "Some": DictType("integer"), "None": "null" }, "Some", new Map<string, bigint>([["a", 1n], ["b", 2n], ["c", 3n]])),
            NewVariant1Simulated: NewVariant({ "Some": "float", "None": "null" }, "Some", Property("Pi", "float")),
            NewVariant2Simulated: NewVariant({ "Some": "float", "None": "null" }, "None", Property("Null", "null")),
            NewVariant3Simulated: NewVariant({ "Some": DictType("integer"), "None": "null" }, "Some", Property("ToDictSimpleSimulated", DictType("integer"))),
            Switch1Mapped: Switch(
                Const(Variant({ "Some": "float", "None": "null" }, "Some", 1)),
                {
                    Some: Multiply(Variable("x", "float"), 2),
                    None: Const(0),
                },
                "x"
            ),
            Switch2Mapped: Switch(
                Const(Variant({ "Some": "float", "None": "null" }, "None")),
                {
                    Some: Multiply(Variable("x", "float"), 2),
                    None: Const(0),
                },
                "x"
            ),
            Switch3Mapped: Switch(
                Const(Variant({ "Some": "float", "None": "null" }, "Some", 1)),
                {
                    Some: Const(true),
                    None: Const(false),
                },
            ),
            Switch4Mapped: Switch(
                Const(Variant({ "Some": "float", "None": "null" }, "None")),
                {
                    Some: Const(true),
                    None: Const(false),
                },
            ),
            Switch1Simulated: Switch(
                IfElse(
                    Property("True", "boolean"),
                    NewVariant({ "Some": "float", "None": "null" }, "Some", 1),
                    NewVariant({ "Some": "float", "None": "null" }, "None"),
                ),
                {
                    Some: Multiply(Variable("x", "float"), 2),
                    None: Const(0),
                },
                "x"
            ),
            Switch2Simulated: Switch(
                IfElse(
                    Not(Property("True", "boolean")),
                    NewVariant({ "Some": "float", "None": "null" }, "Some", 1),
                    NewVariant({ "Some": "float", "None": "null" }, "None"),
                ),
                {
                    Some: Multiply(Variable("x", "float"), 2),
                    None: Const(0),
                },
                "x"
            ),
            Switch3Simulated: Switch(
                IfElse(
                    Property("True", "boolean"),
                    NewVariant({ "Some": "float", "None": "null" }, "Some", 1),
                    NewVariant({ "Some": "float", "None": "null" }, "None"),
                ),
                {
                    Some: Const(true),
                    None: Const(false),
                },
            ),
            Switch4Simulated: Switch(
                IfElse(
                    Not(Property("True", "boolean")),
                    NewVariant({ "Some": "float", "None": "null" }, "Some", 1),
                    NewVariant({ "Some": "float", "None": "null" }, "None"),
                ),
                {
                    Some: Const(true),
                    None: Const(false),
                },
            ),
        },
        events: {},
    }
})

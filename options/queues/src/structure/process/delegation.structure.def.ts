// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib";
import { Add, DictType, Get, GetField, GetProperties, GetProperty, Hour, IfElse, Insert, Keys, LessEqual, Max, MLFunction, Multiply, NewDict, NewSet, Not, ProcessMapping, Property, Reduce, Replace, Round, SetDiff, Size, StringJoin, Struct, StructType, ToSet, Union, UnionAll, Variable } from "@elaraai/edk/lib";

import employees from "../../../gen/employees.structure";
import delegations_pipeline from "../../../gen/delegations.pipeline";
import queues from "../../../gen/queues.structure";
import policy from "../../../gen/policy.structure";
import mode from "../../../gen/mode.structure";

const delegations = delegations_pipeline.output_table;

const allocated_type = StructType({
    Employees: "set",
    TypeCount: DictType("float")
})

export default ELARA.ProcessStructureSchema({
    concept: "Delegation",
    mapping: ProcessMapping({
        input_table: delegations,
        date: delegations.fields.Date,
        properties: {
            predict: delegations.fields.Predict,
            queue: delegations.fields.Queue,
            hour: Hour(delegations.fields.Date),
            all_employees_types: GetProperties({
                property: employees.properties.type
            }),
            all_employees: Keys(Property("all_employees_types", DictType("string"))),
            //get the current set of unique employee types
            types_of_employees: ToSet(
                Property("all_employees_types", DictType("string")),
                Variable("employee_type", "string"),
                Variable("employee_type", "string"),
            ),
            //get the employees currently delegated to the all queues
            queue_allocated_employees: GetProperties({
                property: queues.properties.employees,
            }),
            //get the current set of allocated employees
            current_allocated_employees: UnionAll(Property("queue_allocated_employees", DictType("set"))),
            //collect a set of unallocated employees
            unallocated_employees: SetDiff(
                Property("all_employees", "set"),
                Property("current_allocated_employees", "set"),
            ),
            historic_employee_allocation: delegations.fields.EmployeeIDs,
            employee_count: Size(Property("all_employees_types", DictType("string"))),
            //A learnt model for how many employees of each type should be delegated to each queue
            baseline_delegation: MLFunction({
                output: delegations.fields.EmployeeTypes,
                features: {
                    hour: Property("hour", "integer"),
                    employee_count: Property("employee_count", "integer")
                },
                train: Not(delegations.fields.Predict),
                predict: delegations.fields.Predict,
            }),
            current_arrival_set: GetProperty({
                property: queues.properties.new_queue_arrivals,
                marker: Property("queue", "string")
            }),
            new_queue_arrivals: Size(
                Property("current_arrival_set", "set")
            ),
            bias_parameters: GetProperties({
                property: policy.properties.bias
            }),
            queue_load_parameters: GetProperties({
                property: policy.properties.queue_load
            }),
            //An model that uses queue, employee type and dynamic demand to optimally delegate
            optimised_delegation: IfElse(
                delegations.fields.Predict,
                Reduce(
                    Property("types_of_employees", "set"),
                    Insert(
                        Variable("Previous", DictType("float")),
                        StringJoin`${Property("queue", "string")}.${Variable("key", "string")}`,
                        Max(
                            Add(
                                Get(
                                    Property("bias_parameters", DictType("float")),
                                    StringJoin`${Property("queue", "string")}.${Variable("key", "string")}`
                                ),
                                Multiply(
                                    Get(
                                        Property("queue_load_parameters", DictType("float")),
                                        StringJoin`${Property("queue", "string")}.${Variable("key", "string")}`
                                    ),
                                    Property("new_queue_arrivals", "integer")
                                ),
                            ),
                            0
                        ),
                    ),
                    //initial
                    NewDict("float"),
                    // previous
                    Variable("Previous", DictType("float")),
                    Variable("key", "string")
                ),
                delegations.fields.EmployeeTypes,
            ),
            optimise_mode: GetProperty({
                property: mode.properties.optimise
            }),
            //switch between optimised and baseline delegation strategies based on scenario
            employee_delegation: IfElse(
                Property("optimise_mode", "boolean"),
                Property("optimised_delegation", DictType("float")),
                Property("baseline_delegation", DictType("float"))
            ),
            //greedily delegate unallocated employees to delegation limit 
            //set by employee delegation property
            allocated_employees: Reduce(
                Property("unallocated_employees", "set"),
                //reducer
                IfElse(
                    LessEqual(
                        Add(
                            Replace(
                                Get(
                                    GetField(Variable("Previous", allocated_type), "TypeCount"),
                                    Get(
                                        Property(
                                            "all_employees_types",
                                            DictType("string")
                                        ),
                                        Variable("value", "string")
                                    ),
                                ),
                                null,
                                0
                            ),
                            1
                        ),
                        Round(
                            Replace(
                                Get(
                                    Property("employee_delegation", DictType("float")),
                                    StringJoin`${Property("queue", "string")
                                        }.${Get(
                                            Property("all_employees_types", DictType("string")),
                                            Variable("value", "string")
                                        )
                                        }`
                                ),
                                null,
                                0
                            ),
                        ),
                    ),
                    Struct({
                        Employees: Union(
                            GetField(Variable("Previous", allocated_type), "Employees"),
                            NewSet(
                                Variable("value", "string")
                            )
                        ),
                        TypeCount: Insert(
                            GetField(Variable("Previous", allocated_type), "TypeCount"),
                            Get(
                                Property(
                                    "all_employees_types",
                                    DictType("string")
                                ),
                                Variable("value", "string")
                            ),
                            Add(
                                Replace(
                                    Get(
                                        GetField(Variable("Previous", allocated_type), "TypeCount"),
                                        Get(
                                            Property(
                                                "all_employees_types",
                                                DictType("string")
                                            ),
                                            Variable("value", "string")
                                        ),
                                    ),
                                    null,
                                    0
                                ),
                                1
                            )
                        )
                    }),
                    //Done allocating
                    Variable("Previous", allocated_type),
                ),
                //initial
                Struct({
                    Employees: NewSet(),
                    TypeCount: NewDict("float")
                }),
                // previous
                Variable("Previous", allocated_type),
                // value
                Variable("value", "string"),
            ),
            new_sales_ids: GetProperty({
                property: queues.properties.new_sales_ids,
                marker: Property("queue", "string")
            }),
        },
        events: {
            update_queue_staff: {
                property: queues.properties.employees,
                marker: delegations.fields.Queue,
                value: IfElse(
                    delegations.fields.Predict,
                    GetField(Property("allocated_employees", allocated_type), "Employees"),
                    Property("historic_employee_allocation", "set")
                )
            },
            reset_new_arrivals: {
                property: queues.properties.new_queue_arrivals,
                marker: Property("queue", "string"),
                value: NewSet()
            },
            reset_new_sales: {
                property: queues.properties.new_sales_ids,
                marker: Property("queue", "string"),
                value: NewSet()
            },
            set_sales_qty: {
                property: queues.properties.sales_qty,
                marker: Property("queue", "string"),
                value: Size(
                    Property("new_sales_ids", "set")
                )
            },
            set_queue_arrivals: {
                property: queues.properties.queue_arrivals,
                marker: Property("queue", "string"),
                value: Property("new_queue_arrivals", "integer")
            },
        }
    })
});
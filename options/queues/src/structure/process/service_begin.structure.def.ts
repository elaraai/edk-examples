// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Add,
  AddDuration,
  And,
  Const,
  DictType,
  Duration,
  Equal,
  Filter,
  GenericFunction,
  Get,
  GetField,
  GetProperties,
  GetProperty,
  IfElse,
  IsNull,
  Keys,
  Less,
  LessEqual,
  MaxAll,
  MLFunction,
  Multiply,
  NewSet,
  Not,
  Null,
  ProcessMapping,
  Property,
  Random,
  Reduce,
  Replace,
  StringJoin,
  Struct,
  StructType,
  Subtract,
  Variable,
} from '@elaraai/edk/lib';

import arrival from '../../../gen/arrival.structure';
import employees from '../../../gen/employees.structure';
import policy from '../../../gen/policy.structure';
import queues from '../../../gen/queues.structure';
import work_source from '../../../gen/work.source';

const next_available_type = StructType({
    Marker: "string",
    Date: "datetime"
})

export default ELARA.ProcessStructureSchema({
    concept: "Service Begin",
    mapping: ProcessMapping({
        input_table: work_source.output,
        date: Property("queue_arrival_time", "datetime"),
        marker: work_source.output.fields.ID,
        properties: {
            predict: work_source.output.fields.Predict,
            queue: work_source.output.fields.Queue,
            arrival_id: work_source.output.fields.ID,
            queue_arrival_time: GetProperty({
                property: arrival.properties.arrival_time,
                marker: Property("arrival_id", "string")
            }),
            queue_employees: GetProperty({
                property: queues.properties.employees,
                marker: Property("queue", "string")
            }),
            queue_employee_availability: GetProperties({
                property: employees.properties.availablity,
                markers: Property("queue_employees", "set")
            }),
            queue_employee_available_times: GetProperties({
                property: employees.properties.next_available_time,
                markers: Property("queue_employees", "set")
            }),
            /* Below model implements to following queueing logic
            1 -> If any employee free (have availability) then randomly select employee
            2 -> Otherwise pick one with closest next available time
            */
            max_availability: Replace(MaxAll(Property("queue_employee_availability", DictType("integer"))), null, -1n),
            //find the staff member who will be free soonest (case 2)
            next_available_staff: Reduce(
                //collection
                Property("queue_employee_available_times", DictType("datetime")),
                //reducer
                IfElse(
                    And(
                        LessEqual(
                            Get(
                                Property("queue_employee_availability", DictType("integer")),
                                Variable("marker", "string"),
                            ),
                            0n
                        ),
                        IfElse(
                            IsNull(GetField(Variable("Previous", next_available_type), "Date")),
                            true,
                            Less(
                                GetField(Variable("Previous", next_available_type), "Date"),
                                Variable("date", "datetime"),
                            ),
                        ),
                    ),
                    Struct({
                        Marker: Variable("marker", "string"),
                        Date: Variable("date", "datetime")
                    }),
                    Variable("Previous", next_available_type),
                ),
                // initial (init and prev same type!!!! (return type of func))
                Struct({
                    Marker: Null("string"),
                    Date: Null("datetime")
                }),
                // previous
                Variable("Previous", next_available_type),
                // value
                Variable("date", "datetime"),
                // key
                Variable("marker", "string")
            ),
            all_available_staff: Keys(Filter(
                Property("queue_employee_availability", DictType("integer")),
                Equal(Variable("value", "integer"), 1n),
                Variable("value", "integer"),
            )),
            available_staff: IfElse(
                LessEqual(
                    Property("max_availability", "integer"),
                    0n
                ),
                NewSet(),
                Property("all_available_staff", "set")
            ),
            service_dequeue_time: IfElse(
                work_source.output.fields.Predict,
                IfElse(
                    LessEqual(Property("max_availability", "integer"), 0n),
                    GetField(Property("next_available_staff", next_available_type), "Date"),
                    Property("queue_arrival_time","datetime")
                ),
                work_source.output.fields.ServiceTime
            ),
            //Handle case of no service -> person jumps off queue
            not_served: GenericFunction({
                expression:IsNull(
                    Property("service_dequeue_time", "datetime")
                ),
                objective: IfElse(
                    Property("not_served", "boolean"),
                    Const(-10000),
                    Const(0),
                )
            }),
            //add a time at which non served customers will spontaneously leave the queue
            dequeue_time: IfElse(
                Property("not_served", "boolean"),
                AddDuration(
                    Property("queue_arrival_time", "datetime"),
                    120,
                    "minute"
                ),
                Property("service_dequeue_time","datetime")
            ),
            queue_duration: GenericFunction({
                expression: IfElse(
                    Property("not_served", "boolean"),
                    Null("float"),
                    Duration(
                        Property("queue_arrival_time", "datetime"),
                        Property("dequeue_time", "datetime"),
                        "minute"
                    )
                ),
                objective: IfElse(
                    IsNull(Property("queue_duration", "float")),
                    Const(0),
                    Multiply(
                        Property("queue_duration", "float"),
                        -1
                    )
                )
            }),
            //learn the time duration of service for queue and staff category
            service_duration: MLFunction({
                output: work_source.output.fields.Duration,
                features: {
                    "Staff Type": Property("staff_type", "string"),
                    "Queue": Property("queue", "string")
                },
                train: Not(work_source.output.fields.Predict),
                evaluate: work_source.output.fields.Predict,
            }),
            parameter_name: StringJoin`${Property("queue", "string")}.${Property("staff_type", "string")}`,
            //add extra duration as a sensitivity perturbation
            service_duration_perturbation: GetProperty({
                property: policy.properties.duration_perturbation,
                marker: Property("parameter_name", "string"),
                evaluate: work_source.output.fields.Predict,
                value: 0.0,
            }),
            //select a random available staff member
            random_available_staff: Random({
                distribution: "set",
                set: Property("available_staff", "set"),
                evaluate: work_source.output.fields.Predict,
            }),
            //chose the service staff member based on if any staff member is current available or not
            service_staff: IfElse(
                work_source.output.fields.Predict,
                IfElse(
                    LessEqual(Property("max_availability", "integer"), 0n),
                    GetField(Property("next_available_staff", next_available_type), "Marker"),
                    Property("random_available_staff", "string")
                ),
                work_source.output.fields.StaffID
            ),
            current_service_availability: GetProperty({
                property: employees.properties.availablity,
                marker: Property("service_staff", "string")
            }),
            staff_type: GetProperty({
                property: employees.properties.type,
                marker: Property("service_staff", "string")
            }),
            //update the time service will finish based on simulation case
            finish_time: AddDuration(
                Property("dequeue_time", "datetime"),
                IfElse(
                    Property("not_served", "boolean"),
                    0,
                    Add(
                        Property("service_duration", "float"),
                        Replace(Property("service_duration_perturbation", "float"), Null('float'), 0)
                    ),
                ),
                "second"
            ),
            queue_items: GetProperty({
                property: queues.properties.queue_items,
                marker: Property("queue", "string")
            }),
            enqueue_times: GetProperties({
                property: arrival.properties.arrival_time,
                markers: Property("queue_items", "set")
            }),
            queue_size: GetProperty({
                property: queues.properties.queue_size,
                marker: Property("queue", "string")
            }),
            current_employees: GetProperties({
                property: employees.properties.type
            })
        },
        events: {
            set_availability: {
                property: employees.properties.availablity,
                marker: IfElse(
                    Property("not_served", "boolean"),
                    Null("string"), // disable event if not_served
                    Property("service_staff", "string"),
                ),
                value: Subtract(
                    Property("current_service_availability", "integer"),
                    1n
                ),
            },
            set_next_availability_time: {
                property: employees.properties.next_available_time,
                marker: IfElse(
                    Property("not_served", "boolean"),
                    Null("string"), // disable event if not_served
                    Property("service_staff", "string"),
                ),
                value: Property("finish_time","datetime"),
            },
        }
    })
})

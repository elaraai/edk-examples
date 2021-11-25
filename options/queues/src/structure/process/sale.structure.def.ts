// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Add,
  Const,
  GetProperty,
  IfElse,
  NewSet,
  Null,
  ProcessMapping,
  Property,
  Union,
} from '@elaraai/edk/lib';

import employees from '../../../gen/employees.structure';
import money from '../../../gen/money.structure';
import queues from '../../../gen/queues.structure';
import service_begin from '../../../gen/service_begin.structure';
import work_source from '../../../gen/work.source';

export default ELARA.ProcessStructureSchema({
    concept: "Sale",
    mapping: ProcessMapping({
        input_table: work_source.output,
        date: Property("finish_time", "datetime"),
        marker: work_source.output.fields.ID,
        properties: {
            predict: work_source.output.fields.Predict,
            service_staff: GetProperty({
                property: service_begin.properties.service_staff,
                marker: work_source.output.fields.ID,
            }),
            queue: work_source.output.fields.Queue,
            availability: GetProperty({
                property: employees.properties.availablity,
                marker: Property("service_staff", "string")
            }),
            finish_time: GetProperty({
                property: service_begin.properties.finish_time,
                marker: work_source.output.fields.ID,
            }),
            current_balance: GetProperty({ property: money.properties.balance }),
            new_sales_ids: GetProperty({
                property: queues.properties.new_sales_ids,
                marker: Property("queue", "string")
            }),
            not_served: GetProperty({
                property: service_begin.properties.not_served,
                marker: work_source.output.fields.ID,
            }),
            amount: Const(5.0)
        },
        events: {
            inc_service_availability: {
                property: employees.properties.availablity,
                marker: IfElse(
                    Property("not_served", "boolean"),
                    Null('string'), // disable the event if not_served
                    Property("service_staff", "string"),
                ),
                value: Add(
                    Property("availability", "integer"),
                    1n
                ),
            },
            inc_money: {
                property: money.properties.balance,
                value: IfElse(
                    Property("not_served", "boolean"),
                    Property("current_balance", "float"), // balance unchanged if not_served
                    Add(Property("current_balance", "float"), Property("amount", "float")),
                )
            },
            new_sales: {
                property: queues.properties.new_sales_ids,
                marker: Property("queue", "string"),
                value: Union(
                    Property("new_sales_ids", "set"),
                    NewSet(work_source.output.fields.ID)
                ),
            },
        }
    })
})

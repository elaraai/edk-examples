// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Property, GetProperty, AddDuration, ProcessDate, Add } from "@elaraai/edk/lib"

import work_source from '../../gen/work.source'
import supplier from "../../gen/supplier.structure"

const work = work_source.output

export default ELARA.ProcessStructureSchema({
    concept: "work",
    mapping: {
        input_table: work,
        date: work.fields.date,
        properties: {
            hours: work.fields.hours,
            subcontractor: work.fields.subcontractor,
            supplier: work.fields.supplier,
            work: GetProperty({
                property: supplier.properties.work,
                marker: Property('supplier', 'string')
            }),
            completion: AddDuration(ProcessDate(), Property('hours', 'float'), 'hour'),
        },
        events: {
            update_work: {
                property: supplier.properties.work,
                marker: Property('supplier', 'string'),
                date: Property('completion', 'datetime'),
                value: Add(Property('work', 'float'), Property('hours', 'float'))
            }
        }
    }
})

// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Add,
  AddDuration,
  GetProperties,
  GetProperty,
  NewSet,
  ProcessDate,
  Property,
} from '@elaraai/edk/lib';

import supplier from '../../gen/supplier.structure';
import work_source from '../../gen/work.source';

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
            suppliers: NewSet(work.fields.supplier),
            works1: GetProperties({
                property: supplier.properties.work,
                markers: Property('suppliers', 'set'),
            }),
            works2: GetProperties({
                property: supplier.properties.work,
                markers: NewSet(work.fields.supplier),
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
        },
    }
})

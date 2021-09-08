// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Property } from '@elaraai/edk/lib';

import gp from '../../gen/gp.source'

export default ELARA.ProcessStructureSchema({
    concept: 'GP',
    mapping: {
        input_table: gp.output,
        date: gp.output.fields.dates,
        properties: {
            x_dict: gp.output.fields.x_dict,
            x_string: gp.output.fields.x_string,
            x_bool2: gp.output.fields.x_bool,
            x_bool: Property("x_bool2", "boolean"),
            x_date: gp.output.fields.x_date,
            x_float: gp.output.fields.x_float,
            x_int: gp.output.fields.x_int,
            items: ELARA.MLFunction({
                features: {
                    X_dict: ELARA.Property("x_dict", ELARA.DictType("float")),
                    X_string: ELARA.Property("x_string", 'string'),
                    X_bool: ELARA.Property("x_bool", 'boolean'),
                    X_date: ELARA.Property("x_date", 'datetime'),
                    X_float: ELARA.Property("x_float", 'float'),
                    X_int: ELARA.Property("x_int", 'integer'),
                },
                value: gp.output.fields.y,
                predict: ELARA.IsNull(gp.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(gp.output.fields.y)),
                training_group: gp.output.fields.x_string
            }),
        },
        events: {}
    }
})

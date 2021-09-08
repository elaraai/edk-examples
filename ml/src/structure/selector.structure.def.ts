// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import selector from '../../gen/selector.source'

export default ELARA.ProcessStructureSchema({
    concept: 'Selector',
    mapping: {
        input_table: selector.output,
        date: selector.output.fields.dates,
        properties: {
            x_dict: selector.output.fields.x_dict,
            x_string: selector.output.fields.x_string,
            x_bool: selector.output.fields.x_bool,
            x_date: selector.output.fields.x_date,
            x_float: selector.output.fields.x_float,
            x_int: selector.output.fields.x_int,
            items: ELARA.MLFunction({
                features: {
                    X_dict: ELARA.Property("x_dict", ELARA.DictType("float")),
                    X_string: ELARA.Property("x_string", 'string'),
                    X_bool: ELARA.Property("x_bool", 'boolean'),
                    X_date: ELARA.Property("x_date", 'datetime'),
                    X_float: ELARA.Property("x_float", 'float'),
                    X_int: ELARA.Property("x_int", 'integer'),
                },
                value: selector.output.fields.y,
                predict: ELARA.IsNull(selector.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(selector.output.fields.y)),
            }),
        },
        events: {}
    }
})

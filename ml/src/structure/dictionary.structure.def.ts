// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import dictionary from '../../gen/dictionary.source'

export default ELARA.ProcessStructureSchema({
    concept: 'Dictionary',
    mapping: {
        input_table: dictionary.output,
        date: dictionary.output.fields.dates,
        properties: {
            x_dict: dictionary.output.fields.x_dict,
            x_string: dictionary.output.fields.x_string,
            x_bool: dictionary.output.fields.x_bool,
            x_date: dictionary.output.fields.x_date,
            x_float: dictionary.output.fields.x_float,
            x_int: dictionary.output.fields.x_int,
            items: ELARA.MLFunction({
                features: {
                    X_dict: ELARA.Property("x_dict", ELARA.DictType("float")),
                    X_string: ELARA.Property("x_string", 'string'),
                    X_bool: ELARA.Property("x_bool", 'boolean'),
                    X_date: ELARA.Property("x_date", 'datetime'),
                    X_float: ELARA.Property("x_float", 'float'),
                    X_int: ELARA.Property("x_int", 'integer'),
                },
                value: dictionary.output.fields.y,
                predict: ELARA.IsNull(dictionary.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(dictionary.output.fields.y)),
            }),
        },
        events: {}
    }
})

// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';

import dictionary_float from '../../gen/dictionary_float.source';

export default ELARA.ProcessStructureSchema({
    concept: "Dictionary Float",
    mapping: {
        input_table: dictionary_float.output,
        date: dictionary_float.output.fields.dates,
        properties: {
            x_dict: dictionary_float.output.fields.x_dict,
            x_dict_dict: dictionary_float.output.fields.x_dict_dict,
            x_string: dictionary_float.output.fields.x_string,
            x_bool: dictionary_float.output.fields.x_bool,
            x_date: dictionary_float.output.fields.x_date,
            x_float: dictionary_float.output.fields.x_float,
            x_int: dictionary_float.output.fields.x_int,
            y: dictionary_float.output.fields.y,
            items: ELARA.MLFunction({
                features: {
                    X_dict: ELARA.Property("x_dict", ELARA.DictType("float")),
                    X_dict_dict: ELARA.Property("x_dict_dict", ELARA.DictType(ELARA.DictType("float"))),
                    X_string: ELARA.Property("x_string", 'string'),
                    X_bool: ELARA.Property("x_bool", 'boolean'),
                    X_date: ELARA.Property("x_date", 'datetime'),
                    X_float: ELARA.Property("x_float", 'float'),
                    X_int: ELARA.Property("x_int", 'integer'),
                },
                output: ELARA.Property("y", ELARA.DictType("float")),
                evaluate: ELARA.IsNull(dictionary_float.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(dictionary_float.output.fields.y)),
            }),
        },
        events: {},
    }
})

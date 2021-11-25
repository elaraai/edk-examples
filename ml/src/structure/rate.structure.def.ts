// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';

import rate from '../../gen/rate.source';

export default ELARA.ProcessStructureSchema({
    concept: 'Rate',
    mapping: {
        input_table: rate.output,
        date: rate.output.fields.dates,
        properties: {
            x_dict: rate.output.fields.x_dict,
            x_dict_dict: rate.output.fields.x_dict_dict,
            x_string: rate.output.fields.x_string,
            x_bool: rate.output.fields.x_bool,
            x_date: rate.output.fields.x_date,
            x_float: rate.output.fields.x_float,
            x_int: rate.output.fields.x_int,
            y: rate.output.fields.y,
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
                output: ELARA.Property("y", rate.output.fields.y.type),
                evaluate: ELARA.IsNull(rate.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(rate.output.fields.y)),
            }),
        },
        events: {},
    }
})

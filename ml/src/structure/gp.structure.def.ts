// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import { Property } from '@elaraai/edk/lib';

import gp from '../../gen/gp.source';

export default ELARA.ProcessStructureSchema({
    concept: 'GP',
    mapping: {
        input_table: gp.output,
        date: gp.output.fields.dates,
        properties: {
            x_dict: gp.output.fields.x_dict,
            x_dict_dict: gp.output.fields.x_dict_dict,
            x_string: gp.output.fields.x_string,
            x_bool2: gp.output.fields.x_bool,
            x_bool: Property("x_bool2", "boolean"),
            x_date: gp.output.fields.x_date,
            x_float: gp.output.fields.x_float,
            x_int: gp.output.fields.x_int,
            y: gp.output.fields.y,
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
                output: ELARA.Property("y", "float"),
                evaluate: ELARA.IsNull(gp.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(gp.output.fields.y)),
                training_group: gp.output.fields.x_string,
            }),
            items_max_likelihood: ELARA.MLFunction({
                features: {
                    X_dict: ELARA.Property("x_dict", ELARA.DictType("float")),
                    X_dict_dict: ELARA.Property("x_dict_dict", ELARA.DictType(ELARA.DictType("float"))),
                    X_string: ELARA.Property("x_string", 'string'),
                    X_bool: ELARA.Property("x_bool", 'boolean'),
                    X_date: ELARA.Property("x_date", 'datetime'),
                    X_float: ELARA.Property("x_float", 'float'),
                    X_int: ELARA.Property("x_int", 'integer'),
                },
                output: ELARA.Property("y", "float"),
                evaluate: ELARA.IsNull(gp.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(gp.output.fields.y)),
                training_group: gp.output.fields.x_string,
                sampling_mode: "max_likelihood",
            }),
            items_probability: ELARA.MLFunction({
                features: {
                    X_dict: ELARA.Property("x_dict", ELARA.DictType("float")),
                    X_dict_dict: ELARA.Property("x_dict_dict", ELARA.DictType(ELARA.DictType("float"))),
                    X_string: ELARA.Property("x_string", 'string'),
                    X_bool: ELARA.Property("x_bool", 'boolean'),
                    X_date: ELARA.Property("x_date", 'datetime'),
                    X_float: ELARA.Property("x_float", 'float'),
                    X_int: ELARA.Property("x_int", 'integer'),
                },
                output: ELARA.Property("y", "float"),
                evaluate: ELARA.IsNull(gp.output.fields.y),
                train: ELARA.Not(ELARA.IsNull(gp.output.fields.y)),
                training_group: gp.output.fields.x_string,
                sampling_mode: "probability",
            }),
            x_exp: gp.output.fields.x_exp,
            y_exp: gp.output.fields.y_exp,
            exponential: ELARA.MLFunction({
                features: {
                    X_exp: ELARA.Property("x_exp", 'float'),
                    X_float: ELARA.Property("x_float", 'float'),
                },
                output: ELARA.Property("y_exp", "float"),
                evaluate: ELARA.IsNull(gp.output.fields.y_exp),
                train: ELARA.Not(ELARA.IsNull(gp.output.fields.y_exp)),
                sampling_mode: "sample_squared",
            }),
        },
        events: {},
    }
})

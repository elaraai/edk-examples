// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
// East type declarations 
import * as ELARA from "@elaraai/edk/lib"

const rate_x_dict_type = ELARA.DictType('float');
const rate_y_type = ELARA.StructType({
    max: 'float',
    min: 'float',
    value: 'float',
});


export default ELARA.JsonSourceSchema({
    name: "Rate",
    uri: 'file://data/rate.jsonl',
    primary_key: ELARA.Print(ELARA.Variable("id", 'integer')),
    selections: {
        id: ELARA.Parse(ELARA.Variable("id", 'integer')),
        dates: ELARA.Parse(ELARA.Variable("dates", 'datetime')),
        x_dict: ELARA.Parse(ELARA.Variable("x_dict", rate_x_dict_type)),
        x_dict_dict: ELARA.Parse(ELARA.Variable("x_dict_dict", ELARA.DictType(ELARA.DictType('float')))),
        x_string: ELARA.Parse(ELARA.Variable("x_string", 'string')),
        x_bool: ELARA.Parse(ELARA.Variable("x_bool", 'boolean')),
        x_date: ELARA.Parse(ELARA.Variable("x_date", 'datetime')),
        x_float: ELARA.Parse(ELARA.Variable("x_float", 'float')),
        x_int: ELARA.Parse(ELARA.Variable("x_int", 'integer')),
        y: ELARA.Parse(ELARA.Variable("y", rate_y_type)),
    },
})

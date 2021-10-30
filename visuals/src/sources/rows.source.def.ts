// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { Partition, PartitionPerMonth } from "@elaraai/edk/lib";

const rows_struct_type = ELARA.StructType({
    Date: 'datetime',
    Number: 'float',
    Integer: 'integer',
    String: 'string',
    Boolean: 'boolean',
    Struct: ELARA.StructType({
        Date: 'datetime',
        Number: 'float',
        Integer: 'integer',
        String: 'string',
        Boolean: 'boolean',
        Array: ELARA.ArrayType(ELARA.StructType({
            Date: 'datetime',
            Number: 'float',
            Integer: 'integer',
            String: 'string',
            Boolean: 'boolean',
            Set: 'set',
        })),
    }),
    Array: ELARA.ArrayType('float'),
});
const rows_array_type = ELARA.ArrayType(ELARA.StructType({
    Date: 'datetime',
    Number: 'float',
    Integer: 'integer',
    String: 'string',
    Boolean: 'boolean',
    Array: ELARA.ArrayType('datetime'),
}));
const rows_dict_type = ELARA.DictType('float');


export default ELARA.JsonSourceSchema({
    name: "Rows",
    uri: 'file://files/rows.jsonl',
    primary_key: ELARA.Variable("Identifier", 'string'),
    selections: {
        Identifier: ELARA.Parse(ELARA.Variable("Identifier", 'string')),
        "Prev Identifier": ELARA.Parse(ELARA.Variable("Prev Identifier", 'string')),
        Group: ELARA.Parse(ELARA.Variable("Group", 'string')),
        "String 1": ELARA.Parse(ELARA.Variable("String 1", 'string')),
        "String 2": ELARA.Parse(ELARA.Variable("String 2", 'string')),
        "Prev String 1": ELARA.Parse(ELARA.Variable("Prev String 1", 'string')),
        "Prev String 2": ELARA.Parse(ELARA.Variable("Prev String 2", 'string')),
        "String 3": ELARA.Parse(ELARA.Variable("String 3", 'string')),
        "Date 1": ELARA.Parse(ELARA.Variable("Date 1", 'datetime')),
        "Date 1 Alt": ELARA.Parse(ELARA.Variable("Date 1 Alt", 'datetime')),
        "Date 2": ELARA.Parse(ELARA.Variable("Date 2", 'datetime')),
        "Date 2 Alt": ELARA.Parse(ELARA.Variable("Date 2 Alt", 'datetime')),
        "Date 3": ELARA.Parse(ELARA.Variable("Date 3", 'datetime')),
        "Number 1": ELARA.Parse(ELARA.Variable("Number 1", 'float')),
        "Number 2": ELARA.Parse(ELARA.Variable("Number 2", 'float')),
        "Number 3": ELARA.Parse(ELARA.Variable("Number 3", 'float')),
        "Integer 1": ELARA.Parse(ELARA.Variable("Integer 1", 'integer')),
        "Integer 2": ELARA.Parse(ELARA.Variable("Integer 2", 'integer')),
        "Integer 3": ELARA.Parse(ELARA.Variable("Integer 3", 'integer')),
        "Boolean 1": ELARA.Parse(ELARA.Variable("Boolean 1", 'boolean')),
        "Boolean 2": ELARA.Parse(ELARA.Variable("Boolean 2", 'boolean')),
        Latitude: ELARA.Parse(ELARA.Variable("Latitude", 'float')),
        Longitude: ELARA.Parse(ELARA.Variable("Longitude", 'float')),
        Struct: ELARA.Parse(ELARA.Variable("Struct", rows_struct_type)),
        Array: ELARA.Parse(ELARA.Variable("Array", rows_array_type)),
        Dict: ELARA.Parse(ELARA.Variable("Dict", rows_dict_type)),
    },
    partitions: {
        Group: Partition({
            partition_key: ELARA.Variable("Group", 'string'),
            label: ELARA.StringJoin`Group: ${ELARA.Variable("Group", 'string')}`,
        }),
        Month: PartitionPerMonth(ELARA.Variable("Date 1", 'datetime'))
    },
})

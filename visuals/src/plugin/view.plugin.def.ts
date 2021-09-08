// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { Const, colors, mergeSchemas } from "@elaraai/edk/lib"

import rows_source from "../../gen/rows.source"

const rows = rows_source.output

export default ELARA.Schema(
    mergeSchemas(
        ELARA.ViewSchema(
            ELARA.View({
                name: "Json Data Edge Group",
                partition: rows.partitions.Group,
                table: rows,
                selections: {
                    'Nested String 1': ELARA.GetField(rows.fields.Struct, "String"),
                    'Nested Array': ELARA.GetField(rows.fields.Struct, 'Array'),
                    'New Number 1': ELARA.Multiply(rows.fields["Number 1"], rows.fields["Number 1"]),
                },
                groups: {
                    "String 1 Group": ELARA.ViewGroup({ value: rows.fields["String 1"], dir: 'desc' }),
                    "String 2 Group": rows.fields["String 2"],
                    "Prev String 1 Group": rows.fields["Prev String 1"],
                    "Prev String 2 Group": rows.fields["Prev String 2"]
                },
                aggregations: {
                    "Sum": ELARA.Sum(rows.fields["Number 1"]),
                    "Sum Min": ELARA.Unique(ELARA.Const(10)),
                    "Sum Max": ELARA.Unique(ELARA.Const(40)),
                    "String 1 Unique": ELARA.Unique(rows.fields["String 1"]),
                    "String 2 Unique": ELARA.Unique(rows.fields["String 2"]),
                    "Prev String 1 Unique": ELARA.Unique(rows.fields["Prev String 1"]),
                    "Prev String 2 Unique": ELARA.Unique(rows.fields["Prev String 2"]),
                    "String Combination Unique": ELARA.Unique(ELARA.StringJoin([rows.fields["String 1"], rows.fields["String 2"]])),
                }
            })
        ),
        ELARA.ViewSchema(
            ELARA.View({
                name: 'JSON Data Multi-Group',
                partition: rows.partitions.Group,
                table: rows,
                selections: {
                    'Nested String 1': ELARA.GetField(rows.fields.Struct, "String"),
                    'Nested Array': ELARA.GetField(rows.fields.Struct, 'Array'),
                    'New Number 1': ELARA.Multiply(rows.fields["Number 1"], rows.fields["Number 1"]),
                },
                groups: {
                    "String 1 Group": ELARA.ViewGroup({ value: rows.fields["String 1"], dir: 'desc' }),
                    "String 2 Group": rows.fields["String 2"]
                },
                aggregations: {
                    "Sum": ELARA.Sum(rows.fields["Number 1"]),
                    "Sum Min": ELARA.Unique(ELARA.Const(10)),
                    "Sum Max": ELARA.Unique(ELARA.Const(40)),
                    "String 1 Unique": ELARA.Unique(rows.fields["String 1"]),
                    "String 2 Unique": ELARA.Unique(rows.fields["String 2"]),
                    "Prev String 1 Unique": ELARA.Unique(rows.fields["Prev String 1"]),
                    "Prev String 2 Unique": ELARA.Unique(rows.fields["Prev String 2"]),
                    "String Combination Unique": ELARA.Unique(ELARA.StringJoin([rows.fields["String 1"], rows.fields["String 2"]])),
                }
            })
        ),
        ELARA.ViewSchema(
            ELARA.View({
                name: 'JSON Data Other',
                partition: rows.partitions.Group,
                table: rows,
            })
        ),
        ELARA.ViewSchema(
            ELARA.View({
                name: 'JSON Data Single-Group',
                partition: rows.partitions.Group,
                table: rows,
                selections: {
                    'Nested String 1': ELARA.GetField(rows.fields.Struct, "String"),
                    'Nested Array': ELARA.GetField(rows.fields.Struct, 'Array'),
                    'New Number 1': ELARA.Multiply(rows.fields["Number 1"], rows.fields["Number 1"]),
                },
                groups: {
                    "String 1 Group": ELARA.ViewGroup({ value: rows.fields["String 1"] })
                },
                aggregations: {
                    "Sum": ELARA.ViewAggregation({ value: ELARA.Sum(rows.fields["Number 1"]), dir: 'desc' }),
                    "Min": ELARA.ViewAggregation({ value: ELARA.Minimum(rows.fields["Number 1"]) }),
                    "Max": ELARA.ViewAggregation({ value: ELARA.Maximum(rows.fields["Number 1"]) }),
                    "Avg": ELARA.ViewAggregation({ value: ELARA.Mean(rows.fields["Number 1"]) }),
                    "String 1 Unique": ELARA.ViewAggregation({ value: ELARA.Unique(rows.fields["String 1"]) }),
                }
            })
        ),
        ELARA.ViewSchema(
            ELARA.View({
                name: 'JSON Data',
                partition: rows.partitions.Group,
                table: rows,
                keep_all: true,
                selections: {
                    'Nested String 1': ELARA.GetField(rows.fields.Struct, "String"),
                    'Lorem': ELARA.StringJoin`${rows.fields.Identifier} is something...`,
                    'Nested Array': ELARA.GetField(rows.fields.Struct, 'Array'),
                    'New Number 1': ELARA.Multiply(rows.fields["Number 1"], rows.fields["Number 1"]),
                    'Opacity': Const(0.2),
                    'Color': Const(colors.WhiteGray),
                    'Border': Const(colors.DarkGray),
                }
            })
        ),
        ELARA.ViewSchema(
            ELARA.View({
                name: 'JSON Total',
                partition: rows.partitions.Group,
                table: rows,
                keep_all: false,
                groups: {
                    'Key': ELARA.Const(""),
                },
                aggregations: {
                    "Sum": ELARA.Sum(rows.fields["Number 1"]),
                    "DistinctCount": ELARA.DistinctCount(rows.fields["String 1"]),
                    "Count": ELARA.Count(rows.fields["String 1"]),
                    "Min": ELARA.Minimum(rows.fields["Number 1"]),
                    "Max": ELARA.Maximum(rows.fields["Number 1"]),
                    "Avg": ELARA.Mean(rows.fields["Number 1"]),
                    "Items": ELARA.CollectSet(rows.fields["String 1"]),
                }
            })
        )
    )

)

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import { mergeSchemas, ViewSchema, View, Schema, Maximum, Abs, Unique, ViewAggregation, ViewGroup, Sum, StringJoin, Floor } from "@elaraai/edk/lib"

import pipelines from '../../gen/pipelines.plugin'

const efficiency_improvement_impact = pipelines.pipeline["Efficiency Improvement Impact"].output_table
const wait_duration = pipelines.pipeline["Wait Duration"].output_table
const sales = pipelines.pipeline.Sales.output_table
const queue_size = pipelines.pipeline["Queue Size"].output_table

export default Schema(
    mergeSchemas(
        ViewSchema(
            View({
                name: 'Efficiency Improvement Impact',
                partition: efficiency_improvement_impact.partitions.all,
                table: efficiency_improvement_impact,
                keep_all: false,
                groups: {
                    focus: StringJoin`Skill ${efficiency_improvement_impact.fields.type} on ${efficiency_improvement_impact.fields.queue}`
                },
                aggregations: {
                    impact: ViewAggregation({ value: Maximum(Abs(efficiency_improvement_impact.fields.normalized_sensitivity)), dir: 'desc' }),
                    skill: Unique(efficiency_improvement_impact.fields.type),
                    queue: Unique(efficiency_improvement_impact.fields.queue)
                }
            })
        ),
        ViewSchema(
            View({
                name: 'Sales',
                partition: sales.partitions.all,
                table: sales,
                keep_all: false,
                groups: {
                    scenario: ViewGroup({ value: sales.fields.scenario, dir: 'asc'}),
                    date: ViewGroup({ value: Floor(sales.fields.date, 'day'), dir: 'asc'}),
                },
                aggregations: {
                    "daily revenue": Sum(sales.fields["daily revenue"]),
                    color: Unique(sales.fields.color),
                    day: Unique(sales.fields.day),
                }
            })
        ),
        ViewSchema(
            View({
                name: 'Queue Size',
                partition: queue_size.partitions.all,
                table: queue_size,
                keep_all: false,
                groups: {
                    scenario: ViewGroup({ value: queue_size.fields.scenario, dir: 'asc'}),
                    date: ViewGroup({ value: Floor(queue_size.fields.date, 'day'), dir: 'asc'}),
                },
                aggregations: {
                    color: Unique(queue_size.fields.color),
                    "queue size": Sum(queue_size.fields["queue size"]),
                    day: Unique(queue_size.fields.day),
                }
            })
        ),
        ViewSchema(
            View({
                name: 'Wait Duration',
                partition: wait_duration.partitions.all,
                table: wait_duration,
                groups: {
                    distribution: ViewGroup({ value: wait_duration.fields.group, dir: 'asc' }),
                },
            })
        ),
    )
)

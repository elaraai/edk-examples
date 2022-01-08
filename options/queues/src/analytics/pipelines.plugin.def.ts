// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { AggregateOperation, Const, DateKey, DistributionOperation, Divide, Equal, FilterOperation, Floor, IfElse, JoinOperation, Maximum, mergeSchemas, PipelineSchema, Print, RegexContains, SelectOperation, StringJoin, Sum, Unique, Variable } from "@elaraai/edk/lib"

import baseline from '../../gen/baseline.scenario'
import optimised from '../../gen/optimised.scenario'
import policy from "../../gen/policy.structure"
import simulation from "../../gen/simulation.plugin"

const service_begin_simulation = simulation.pipeline["Service Begin Simulation"].output_table
const sale_simulation = simulation.pipeline["Sale Simulation"].output_table
const queue_simulation = simulation.pipeline["Queue Simulation"].output_table

const policy_sensitivity = policy.properties.duration_perturbation.sensitivity_table;
const policy_instances = policy.instance_table

export default ELARA.Schema(
    mergeSchemas(
        PipelineSchema({
            name: "Queue Size",
            input_table: queue_simulation,
            operations: [
                AggregateOperation({
                    group_field: Variable("key", 'string'),
                    group_value: StringJoin`${DateKey(queue_simulation.fields.date, 'day')}.${queue_simulation.fields.scenario}`,
                    aggregations: {
                        scenario: Unique(queue_simulation.fields.scenario),
                        "queue size": Maximum(queue_simulation.fields.queue_size),
                        day: Unique(Print(queue_simulation.fields.date, 'ddd D MMM')),
                        date: Unique(Floor(queue_simulation.fields.date, 'day')),
                    }
                }),
            ]
        }),
        PipelineSchema({
            name: "Sales",
            input_table: sale_simulation,
            operations: [
                AggregateOperation({
                    group_field: Variable("key", 'string'),
                    group_value: StringJoin`${DateKey(sale_simulation.fields.finish_time, 'day')}.${sale_simulation.fields.scenario}`,
                    aggregations: {
                        scenario: Unique(sale_simulation.fields.scenario),
                        "daily revenue": Sum(sale_simulation.fields.amount),
                        day: Unique(Print(sale_simulation.fields.finish_time, 'ddd D MMM')),
                        date: Unique(Floor(sale_simulation.fields.finish_time, 'day')),
                    }
                }),
            ]
        }),
        PipelineSchema({
            name: "Wait Duration",
            input_table: service_begin_simulation,
            operations: [
                FilterOperation({
                    predicate: service_begin_simulation.fields.predict
                }),
                DistributionOperation({
                    samples: service_begin_simulation.fields.queue_duration,
                    group_key: StringJoin`${service_begin_simulation.fields.queue} (${service_begin_simulation.fields.scenario})`,
                    distribution: 'GaussianKDE',
                    normalization: 'ProbabilityDensity'
                }),
                SelectOperation({
                    keep_all: true,
                    selections: {
                        value: Divide(Variable('value', 'float'), 3600),
                        scenario: IfElse(
                            RegexContains(Variable('group', 'string'), baseline.name),
                            Const(baseline.name),
                            Const(optimised.name)
                        )
                    }
                })
            ]
        }),
        PipelineSchema({
            name: "Efficiency Improvement Impact",
            input_table: policy_sensitivity,
            operations: [
                FilterOperation({
                    predicate: Equal(policy_sensitivity.fields.scenario, Const(baseline.name))
                }),
                JoinOperation({
                    source_table: policy_instances,
                    source_key: policy_instances.fields.marker,
                    target_key: policy_sensitivity.fields.marker
                })
            ]
        })
    )
)

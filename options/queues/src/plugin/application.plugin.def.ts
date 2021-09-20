// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
    ApplicationPlugin, colors, Const, DataSourcePlugin, GroupFixedColor,
    GroupLinearColor, GroupLineValueSeries, GroupLineVisual, GroupPieSeries, GroupPieVisual,
    Layout, mergeSchemas, MLFunctionPlugin, PanelContainer, PanelDimension, PanelPageSchema,
    PanelVisual, PipelinePlugin, RowFixedColor, RowRidgelineSeries, RowRidgelineVisual, Schema,
    StringJoin, SuperUser, Tooltip, XAxis, YAxis
} from '@elaraai/edk/lib';

import allocations_pipeline from '../../gen/allocations.pipeline';
import availability_source from '../../gen/availability.source';
import delegation from '../../gen/delegation.structure';
import delegations_pipeline from '../../gen/delegations.pipeline';
import policy_source from '../../gen/policy.source';
import queues_source from '../../gen/queues.source';
import service_begin from '../../gen/service_begin.structure';
import staff_source from '../../gen/staff.source';
import views from '../../gen/views.plugin';
import work_source from '../../gen/work.source';

const efficiency_improvement_impact = views.view["Efficiency Improvement Impact"]
const sales = views.view["Sales"]
const queue_size = views.view['Queue Size']
const wait_duration = views.view['Wait Duration']

export default Schema(
    ApplicationPlugin({
        name: "Queue Example",
        schemas: {
            Outcomes: PanelPageSchema({
                name: "Outcomes",
                icon: 'finance',
                container: PanelContainer({
                    size: PanelDimension({ size: 100 }),
                    orientation: 'column',
                    items: [
                        PanelContainer({
                            size: PanelDimension({ size: 50 }),
                            orientation: 'row',
                            items: [
                                PanelVisual({
                                    name: "Daily Revenue",
                                    size: PanelDimension({ size: 50 }),
                                    visual: GroupLineVisual({
                                        series: GroupLineValueSeries({
                                            view: sales,
                                            x: sales.aggregations.day,
                                            y: sales.aggregations['daily revenue'],
                                            key: sales.groups.scenario,
                                            curve: 'curve_monotone_x',
                                            color: GroupFixedColor(sales.aggregations.color),
                                            tooltip: Tooltip({
                                                title: StringJoin`${sales.fields.scenario} sales`,
                                                values: {
                                                    'daily revenue': sales.fields['daily revenue'],
                                                    day: sales.fields.day,
                                                }
                                            })
                                        })
                                    })
                                }),
                                PanelVisual({
                                    name: "Time to Service",
                                    size: PanelDimension({ size: 50 }),
                                    visual: RowRidgelineVisual({
                                        series: RowRidgelineSeries({
                                            view: wait_duration,
                                            x: wait_duration.fields.value,
                                            z: wait_duration.fields.probability,
                                            z_overlap: 0.1,
                                            curve: 'curve_monotone_x',
                                            color: RowFixedColor(wait_duration.fields.color),
                                            tooltip: Tooltip({
                                                title: StringJoin`${wait_duration.fields.group} duration`,
                                                values: {
                                                    duration: wait_duration.fields.value,
                                                    percentage: wait_duration.fields.probability,
                                                }
                                            })
                                        }),
                                        layout: Layout<'float', 'string'>({
                                            xaxis: XAxis({ type: 'float', ticks: { min: 0 }, title: { text: "Time to Service (hours)" } }),
                                            yaxis: YAxis({ type: 'string', ticks: { size: 120 } }),
                                        }),
                                    })
                                }),
                            ],
                        }),
                        PanelContainer({
                            size: PanelDimension({ size: 50 }),
                            orientation: 'row',
                            items: [
                                PanelVisual({
                                    size: PanelDimension({ size: 50 }),
                                    name: "Efficiency Improvement Impact",
                                    visual: GroupPieVisual({
                                        series: GroupPieSeries({
                                            view: efficiency_improvement_impact,
                                            x: efficiency_improvement_impact.groups.focus,
                                            value: efficiency_improvement_impact.aggregations.impact,
                                            color: GroupLinearColor(efficiency_improvement_impact.aggregations.impact, [colors.Blue, colors.Red]),
                                            tooltip: Tooltip({
                                                title: StringJoin`${efficiency_improvement_impact.fields.focus}`,
                                                values: {
                                                    queue: efficiency_improvement_impact.fields.queue,
                                                    skill: efficiency_improvement_impact.fields.skill,
                                                    impact: efficiency_improvement_impact.fields.impact,
                                                }
                                            })
                                        }),
                                    })
                                }),
                                PanelVisual({
                                    name: "Queue Size",
                                    size: PanelDimension({ size: 50 }),
                                    visual: GroupLineVisual({
                                        series: GroupLineValueSeries({
                                            view: queue_size,
                                            x: queue_size.aggregations.day,
                                            y: queue_size.aggregations['queue size'],
                                            key: queue_size.groups.scenario,
                                            curve: 'curve_monotone_x',
                                            color: GroupFixedColor(queue_size.aggregations.color),
                                            tooltip: Tooltip({
                                                title: StringJoin`${queue_size.fields.scenario} sales`,
                                                values: {
                                                    'queue size': queue_size.fields['queue size'],
                                                    day: queue_size.fields.day,
                                                }
                                            })
                                        })
                                    })
                                }),
                            ],
                        })
                    ],
                }),
                grants: [],
            }),
            "Machine Learning":  mergeSchemas(
                MLFunctionPlugin({ func: service_begin.properties.service_duration.function }),
                MLFunctionPlugin({ func: delegation.properties.baseline_delegation.function }),
            ),
            Pipeline: PipelinePlugin({
                pipelines: [
                    delegations_pipeline,
                    allocations_pipeline,
                ],
                prepend: "Pipeline"
            }),
            DataSource: DataSourcePlugin({
                datasources: [
                    staff_source,
                    queues_source,
                    work_source,
                    availability_source,
                    policy_source
                ],
                prepend: "Datasource"
            }),
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin')
            })
        ],
    })
)
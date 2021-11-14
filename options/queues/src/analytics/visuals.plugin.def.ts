// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { VisualSchema, GroupLineVisual, GroupLineValueSeries, GroupFixedColor, Tooltip, StringJoin, Layout, RowFixedColor, RowRidgelineSeries, RowRidgelineVisual, XAxis, YAxis, GroupPieVisual, colors, GroupLinearColor, GroupPieSeries, AxisTick, AxisTitle } from "@elaraai/edk/lib"

import views from '../../gen/views.plugin';

const efficiency_improvement_impact = views.view["Efficiency Improvement Impact"]
const sales = views.view["Sales"]
const queue_size = views.view['Queue Size']
const wait_duration = views.view['Wait Duration']

export default ELARA.mergeSchemas(
    VisualSchema(
        GroupLineVisual({
            name: "Daily Revenue",
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
    ),
    VisualSchema(
        RowRidgelineVisual({
            name: "Time to Service",
            series: RowRidgelineSeries({
                view: wait_duration,
                x: wait_duration.fields.value,
                z: wait_duration.fields.probability,
                z_overlap: 0.0,
                curve: 'curve_monotone_x',
                color: RowFixedColor(wait_duration.fields.color),
                tooltip: Tooltip({
                    title: StringJoin`${wait_duration.fields.distribution} duration`,
                    values: {
                        duration: wait_duration.fields.value,
                        percentage: wait_duration.fields.probability,
                    }
                })
            }),
            layout: Layout<'float', 'string'>({
                xaxis: XAxis({
                    type: 'float',
                    ticks: AxisTick({ min: 0 }),
                    title: AxisTitle({ text: "Time to Service (hours)" })
                }),
                yaxis: YAxis({
                    type: 'string',
                    ticks: AxisTick({ size: 120 })
                }),
            }),
        })
    ),
    VisualSchema(
        GroupPieVisual({
            name: "Efficiency Improvement Priorities",
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
    ),
    VisualSchema(
        GroupLineVisual({
            name: "Queue Size",
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
    )
)

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';

import view_plugin from '../../gen/view.plugin';

const json_data_edge_group = view_plugin.view["Json Data Edge Group"]
const json_data_multi_group = view_plugin.view["JSON Data Multi-Group"]
const json_data_single_group = view_plugin.view["JSON Data Single-Group"]
const json_total = view_plugin.view["JSON Total"]


export default ELARA.PanelPageSchema({
    name: "Group Two",
    container: ELARA.PanelContainer({
        size: ELARA.PanelDimension({ size: 100 }),
        orientation: 'column',
        items: [
            ELARA.PanelContainer({
                size: ELARA.PanelDimension({ size: 50 }),
                orientation: 'row',
                items: [
                    ELARA.PanelVisual({
                        name: "Flow",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.GroupFlowVisual({
                            series: ELARA.GroupFlowSeries({
                                view: json_data_edge_group,
                                x: { prev: json_data_edge_group.aggregations['Prev String 1 Unique'], curr: json_data_edge_group.groups['String 1 Group'] }, 
                                y: { prev: json_data_edge_group.aggregations['Prev String 2 Unique'], curr: json_data_edge_group.groups['String 2 Group'] },
                                value: json_data_edge_group.aggregations.Sum,
                                color: ELARA.GroupLinearColor(json_data_edge_group.aggregations.Sum),
                                tooltip: ELARA.Tooltip({
                                    title: ELARA.Const("Values"),
                                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_edge_group.fields.Sum}</b> placed here.</p>`,
                                    values: {
                                        Sum: json_data_edge_group.fields.Sum,
                                        'Sum Max': json_data_edge_group.fields['Sum Max'],
                                        'Sum Min': json_data_edge_group.fields['Sum Min'],
                                        "String 1 Unique": json_data_edge_group.fields["String 1 Unique"],
                                        "String 2 Unique": json_data_edge_group.fields['String 2 Unique'],
                                    }
                                })
                            }),
                            notes: ELARA.GroupHTMLSeries({
                                view: json_total,
                                value: ELARA.StringJoin`
                                    While there is a maximum of <b>${json_total.fields.Max}</b> and a 
                                    minimum of <b>${json_total.fields.Min}</b>, the average is ${json_total.fields.Min}.
                                    <br></br>
                                    Duis sed elit vel neque ornare pharetra vel a augue. Suspendisse auctor tincidunt tincidunt. Duis tincidunt in eros ac scelerisque. Vestibulum mattis, tellus sit amet elementum sodales, nunc enim scelerisque eros, in auctor magna dolor at ipsum. Aenean ac convallis purus. In sodales, eros non suscipit lobortis, lacus dolor varius eros, eu hendrerit est nibh nec nisi. Proin dolor arcu, eleifend non semper in, scelerisque quis est.
                                    <br></br>
                                    Otherwise you will probably find the following interesting:
                                    <table style="width: 100%">
                                    <tr>
                                        <th style="text-align: left !important; background: lightgray;">Name</th>
                                        <th style="text-align: left !important; background: lightgray;">Value</th>
                                    </tr>
                                    <tr>
                                        <td>Count</td>
                                        <td>${json_total.fields.Count}</td>
                                    </tr>
                                    <tr>
                                        <td>DistinctCount</td>
                                        <td>${json_total.fields.DistinctCount}</td>
                                    </tr>
                                    <tr>
                                        <td>Sum</td>
                                        <td>${json_total.fields.Sum}</td>
                                    </tr>
                                    </table>
                                    <br></br>
                                    Otherwise just remember, lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida tempor leo, ac varius quam porttitor vel. Fusce vel nibh eget mauris malesuada malesuada nec sed urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ante turpis, viverra congue viverra at.
                                    `
                             })
                        })
                    }),
                    ELARA.PanelVisual({
                        name: "Range",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.GroupRangeVisual({
                            series: ELARA.GroupRangeSeries({
                                view: json_data_single_group,
                                x1: json_data_single_group.aggregations.Min, 
                                x2: json_data_single_group.aggregations.Max,
                                x_mid: json_data_single_group.aggregations.Avg,
                                y: json_data_single_group.aggregations['String 1 Unique'],
                                color: ELARA.GroupLinearColor(json_data_multi_group.aggregations.Sum),
                                tooltip: ELARA.Tooltip({
                                    title: ELARA.Const("Values"),
                                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_single_group.fields.Sum}</b> placed here.</p>`,
                                    values: {
                                        Avg: json_data_single_group.fields.Avg,
                                        Max: json_data_single_group.fields.Max,
                                        Min: json_data_single_group.fields.Min,
                                        Sum: json_data_single_group.fields.Sum,
                                        "String 1 Unique": json_data_single_group.fields["String 1 Unique"],
                                    }
                                })
                            }),
                            notes: ELARA.GroupHTMLSeries({
                                view: json_total,
                                value: ELARA.StringJoin`
                                    While there is a maximum of <b>${json_total.fields.Max}</b> and a 
                                    minimum of <b>${json_total.fields.Min}</b>, the average is ${json_total.fields.Min}.
                                    <br></br>
                                    Duis sed elit vel neque ornare pharetra vel a augue. Suspendisse auctor tincidunt tincidunt. Duis tincidunt in eros ac scelerisque. Vestibulum mattis, tellus sit amet elementum sodales, nunc enim scelerisque eros, in auctor magna dolor at ipsum. Aenean ac convallis purus. In sodales, eros non suscipit lobortis, lacus dolor varius eros, eu hendrerit est nibh nec nisi. Proin dolor arcu, eleifend non semper in, scelerisque quis est.
                                    <br></br>
                                    Otherwise you will probably find the following interesting:
                                    <table style="width: 100%">
                                    <tr>
                                        <th style="text-align: left !important; background: lightgray;">Name</th>
                                        <th style="text-align: left !important; background: lightgray;">Value</th>
                                    </tr>
                                    <tr>
                                        <td>Count</td>
                                        <td>${json_total.fields.Count}</td>
                                    </tr>
                                    <tr>
                                        <td>DistinctCount</td>
                                        <td>${json_total.fields.DistinctCount}</td>
                                    </tr>
                                    <tr>
                                        <td>Sum</td>
                                        <td>${json_total.fields.Sum}</td>
                                    </tr>
                                    </table>
                                    <br></br>
                                    Otherwise just remember, lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida tempor leo, ac varius quam porttitor vel. Fusce vel nibh eget mauris malesuada malesuada nec sed urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ante turpis, viverra congue viverra at.
                                    `   
                             })
                        })
                    }),
                ]
            }),
            ELARA.PanelContainer({
                size: ELARA.PanelDimension({ size: 50 }),
                orientation: 'row',
                items: [

                    ELARA.PanelVisual({
                        name: "Pie",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.GroupPieVisual({
                            series: ELARA.GroupPieSeries({
                                view: json_data_single_group,
                                x: json_data_single_group.aggregations["String 1 Unique"],
                                value: json_data_single_group.aggregations.Sum,
                                color: ELARA.GroupOrdinalColor(json_data_single_group.aggregations["String 1 Unique"]),
                                tooltip: ELARA.Tooltip({
                                    title: ELARA.Const("Values"),
                                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_single_group.fields.Sum}</b> placed here.</p>`,
                                    values: {
                                        Sum: json_data_single_group.fields.Sum,
                                        "String 1 Unique": json_data_single_group.fields["String 1 Unique"],
                                    }
                                })
                            }),
                            notes: ELARA.GroupHTMLSeries({
                                view: json_total,
                                value: ELARA.StringJoin`
                                    While there is a maximum of <b>${json_total.fields.Max}</b> and a 
                                    minimum of <b>${json_total.fields.Min}</b>, the average is ${json_total.fields.Min}.
                                    <br></br>
                                    Duis sed elit vel neque ornare pharetra vel a augue. Suspendisse auctor tincidunt tincidunt. Duis tincidunt in eros ac scelerisque. Vestibulum mattis, tellus sit amet elementum sodales, nunc enim scelerisque eros, in auctor magna dolor at ipsum. Aenean ac convallis purus. In sodales, eros non suscipit lobortis, lacus dolor varius eros, eu hendrerit est nibh nec nisi. Proin dolor arcu, eleifend non semper in, scelerisque quis est.
                                    <br></br>
                                    Otherwise you will probably find the following interesting:
                                    <table style="width: 100%">
                                    <tr>
                                        <th style="text-align: left !important; background: lightgray;">Name</th>
                                        <th style="text-align: left !important; background: lightgray;">Value</th>
                                    </tr>
                                    <tr>
                                        <td>Count</td>
                                        <td>${json_total.fields.Count}</td>
                                    </tr>
                                    <tr>
                                        <td>DistinctCount</td>
                                        <td>${json_total.fields.DistinctCount}</td>
                                    </tr>
                                    <tr>
                                        <td>Sum</td>
                                        <td>${json_total.fields.Sum}</td>
                                    </tr>
                                    </table>
                                    <br></br>
                                    Otherwise just remember, lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida tempor leo, ac varius quam porttitor vel. Fusce vel nibh eget mauris malesuada malesuada nec sed urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ante turpis, viverra congue viverra at.
                                    `
                            })
                        })
                    }),
                    ELARA.PanelVisual({
                        name: "Scatter",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.GroupScatterVisual({
                            series: ELARA.GroupScatterSeries({
                                view: json_data_multi_group,
                                x: json_data_multi_group.aggregations["String 1 Unique"],
                                y: json_data_multi_group.aggregations["String 2 Unique"],
                                size: json_data_multi_group.aggregations.Sum,
                                color: ELARA.GroupOrdinalColor(json_data_multi_group.aggregations["String Combination Unique"]),
                                tooltip: ELARA.Tooltip({
                                    title: ELARA.Const("Values"),
                                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields.Sum}</b> placed here.</p>`,
                                    values: {
                                        Sum: json_data_single_group.fields.Sum,
                                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
                                        "String Combination Unique": json_data_multi_group.fields["String Combination Unique"],
                                    }
                                })
                            }),
                            notes: ELARA.GroupHTMLSeries({
                                view: json_total,
                                value: ELARA.StringJoin`
                                    While there is a maximum of <b>${json_total.fields.Max}</b> and a 
                                    minimum of <b>${json_total.fields.Min}</b>, the average is ${json_total.fields.Min}.
                                    <br></br>
                                    Duis sed elit vel neque ornare pharetra vel a augue. Suspendisse auctor tincidunt tincidunt. Duis tincidunt in eros ac scelerisque. Vestibulum mattis, tellus sit amet elementum sodales, nunc enim scelerisque eros, in auctor magna dolor at ipsum. Aenean ac convallis purus. In sodales, eros non suscipit lobortis, lacus dolor varius eros, eu hendrerit est nibh nec nisi. Proin dolor arcu, eleifend non semper in, scelerisque quis est.
                                    <br></br>
                                    Otherwise you will probably find the following interesting:
                                    <table style="width: 100%">
                                    <tr>
                                        <th style="text-align: left !important; background: lightgray;">Name</th>
                                        <th style="text-align: left !important; background: lightgray;">Value</th>
                                    </tr>
                                    <tr>
                                        <td>Count</td>
                                        <td>${json_total.fields.Count}</td>
                                    </tr>
                                    <tr>
                                        <td>DistinctCount</td>
                                        <td>${json_total.fields.DistinctCount}</td>
                                    </tr>
                                    <tr>
                                        <td>Sum</td>
                                        <td>${json_total.fields.Sum}</td>
                                    </tr>
                                    </table>
                                    <br></br>
                                    Otherwise just remember, lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida tempor leo, ac varius quam porttitor vel. Fusce vel nibh eget mauris malesuada malesuada nec sed urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ante turpis, viverra congue viverra at.
                                    `
                             })
                        })
                    }),
                ]
            }),
        ]
    }),    
    grants: [],
})

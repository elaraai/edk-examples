// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { colors, RowTimelineInput } from "@elaraai/edk/lib";

import view_plugin from '../../gen/view.plugin';

const json_data_single_group = view_plugin.view["JSON Data Single-Group"]
const json_total = view_plugin.view["JSON Total"]
const json_data = view_plugin.view["JSON Data"]

export default ELARA.PanelPageSchema({
    name: "Row Two",
    container: ELARA.PanelContainer({
        size: ELARA.PanelDimension({ size: 100 }),
        orientation: 'row',
        items: [
            ELARA.PanelContainer({
                size: ELARA.PanelDimension({ size: 75 }),
                orientation: 'column',
                items: [
                    ELARA.PanelContainer({
                        size: ELARA.PanelDimension({ size: 50 }),
                        orientation: 'row',
                        items: [
                            ELARA.PanelVisual({
                                name: "Timeline",
                                size: ELARA.PanelDimension({ size: 50 }),
                                visual: ELARA.RowTimelineVisual({
                                    series: ELARA.RowTimelineSeries({
                                        view: json_data_single_group,
                                        x: [
                                            RowTimelineInput({
                                                start: json_data_single_group.fields["Date 1 Alt"],
                                                end: json_data_single_group.fields["Date 2 Alt"],
                                                color: ELARA.ColorValue(colors.Gray),
                                            }),
                                            RowTimelineInput({
                                                start: json_data_single_group.fields["Date 1"],
                                                end: json_data_single_group.fields["Date 2"],
                                                prev_primary: json_data_single_group.fields["Prev Identifier"],
                                                color: ELARA.RowOrdinalColor(json_data_single_group.fields["String 2"]),
                                                tooltip: ELARA.Tooltip({
                                                    title: ELARA.Const("Values"),
                                                    values: json_data_single_group.fields
                                                })
                                            }),
                                        ],
                                        y: json_data_single_group.primary_key,
                                    }),
                                    notes: ELARA.RowHTMLSeries({
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
                                name: "Marginal",
                                size: ELARA.PanelDimension({ size: 50 }),
                                visual: ELARA.RowMarginalVisual({
                                    series: ELARA.RowMarginalSeries({
                                        view: json_data,
                                        y: json_data.fields["Number 1"],
                                        x: [
                                            ELARA.RowMarginalValue({
                                                name: "String 1",
                                                value: json_data.fields["String 1"],
                                                color: ELARA.ColorValue(),
                                            }),
                                            ELARA.RowMarginalValue({
                                                name: "Number 2",
                                                value: json_data.fields["Number 2"],
                                                color: ELARA.ColorValue(ELARA.colors.Red),
                                            }),
                                            ELARA.RowMarginalValue({
                                                name: "Date 3",
                                                value: json_data.fields["Date 3"],
                                                color: ELARA.ColorValue(ELARA.colors.Yellow),
                                            }),
                                            ELARA.RowMarginalValue({
                                                name: "Boolean 1",
                                                value: json_data.fields["Boolean 1"],
                                                color: ELARA.ColorValue(ELARA.colors.Violet),
                                            }),
                                            ELARA.RowMarginalDict({
                                                name: "Dict",
                                                value: json_data.fields.Dict,
                                                color: ELARA.RowKeyColor(json_data.fields.Dict),
                                            }),
                                        ]
                                    }),
                                    notes: ELARA.RowHTMLSeries({
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
                                name: "Tree",
                                size: ELARA.PanelDimension({ size: 50 }),
                                visual: ELARA.RowTreeVisual({
                                    series: ELARA.RowTreeSeries({ view: json_data, value: json_data.fields }),
                                    notes: ELARA.RowHTMLSeries({
                                        view: json_total,
                                        value: ELARA.StringJoin(["Max ", ELARA.Print(json_total.fields.Max)], "")
                                    })
                                })
                            }),
                            ELARA.PanelVisual({
                                name: "Table",
                                size: ELARA.PanelDimension({ size: 50 }),
                                visual: ELARA.RowTableVisual({
                                    series: ELARA.RowTableSeries({
                                        view: json_data_single_group,
                                    }),
                                    notes: ELARA.RowHTMLSeries({
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
                                }),
                            }),
                        ]
                    }),
                ]
            }),
            ELARA.PanelContainer({
                size: ELARA.PanelDimension({ size: 25 }),
                orientation: 'column',
                items: [
                    ELARA.PanelVisual({
                        name: "Form",
                        size: ELARA.PanelDimension({ size: 30 }),
                        visual: ELARA.RowFormVisual({
                            series: ELARA.RowFormSeries({
                                view: json_data,
                                elements: [
                                    ELARA.FormInput({
                                        name: "Date 1",
                                        value: json_data.fields["Date 1"]
                                    }),
                                    ELARA.FormInput({
                                        name: "Boolean",
                                        value: json_data.fields["Boolean 1"]
                                    }),
                                    ELARA.FormInput({
                                        name: "String",
                                        value: json_data.fields["String 2"]
                                    }),
                                    ELARA.FormInput({
                                        name: "Integer",
                                        value: json_data.fields["Integer 1"]
                                    }),
                                    ELARA.FormInput({
                                        name: "Input",
                                        value: json_data.fields["Number 1"],
                                    }),
                                ],
                            }),
                            notes: ELARA.RowHTMLSeries({
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
                        name: "List",
                        size: ELARA.PanelDimension({ size: 70 }),
                        visual: ELARA.RowListVisual({
                            series: ELARA.RowListSeries({
                                view: json_data,
                                value: json_data.fields["String 1"],
                                description: json_data.fields.Lorem,
                                color: ELARA.RowLinearColor(json_data.fields["Integer 1"]),
                                elements: [
                                    ELARA.RowListContent({ name: "Date 1", value: json_data.fields["Date 1"] }),
                                    ELARA.RowListContent({
                                        name: "String 2",
                                        value: json_data.fields["String 2"],
                                        color: ELARA.RowOrdinalColor(json_data.fields["String 2"])
                                    }),
                                    ELARA.RowListContent({ name: "Boolean", value: json_data.fields["Boolean 1"] }),
                                    ELARA.RowListContent({ name: "Integer", value: json_data.fields["Integer 1"], }),
                                    ELARA.RowListContent({ name: "Number", value: json_data.fields["Number 1"], }),
                                ],
                            }),
                            notes: ELARA.RowHTMLSeries({
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
                        }),
                    }),
                ]
            }),
        ]
    }),
    grants: [],
})

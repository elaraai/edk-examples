// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { colors, ColorValue, RowAreaDict, RowAreaValue } from "@elaraai/edk/lib";

import view_plugin from '../../gen/view.plugin';

const json_data_edge_group = view_plugin.view["Json Data Edge Group"]
const json_data_multi_group = view_plugin.view["JSON Data Multi-Group"]
const json_data_single_group = view_plugin.view["JSON Data Single-Group"]
const json_total = view_plugin.view["JSON Total"]
const json_data = view_plugin.view["JSON Data"]
const json_distribution_single_group = view_plugin.view['JSON Distribution Single-Group']

export default ELARA.mergeSchemas(
    ELARA.VisualSchema(
        ELARA.RowPivotVisual({
            name: "Row Pivot",
            series: ELARA.RowPivotSeries({
                view: json_data,
                row_pivot: json_data.fields["String 3"],
                col_pivot: json_data.fields["Priority"],
                col_order: json_data.fields["Offset"],
                label: json_data.fields["String 1"],
                value: json_data.fields["Struct 1"],
                opacity: json_data.fields["Number 3"],
                background: ColorValue(colors.Green),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    values: {
                        "String 1" : json_data.fields["String 1"],
                        "Integer 1" : json_data.fields["Integer 1"],
                        "Number 1" : json_data.fields["Number 1"],
                        "Date 1" : json_data.fields["Date 1"],
                        "Boolean 1" : json_data.fields["Boolean 1"],
                    }
                })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowLineVisual({
            name: "Row Line",
            series: ELARA.RowLineSeries({
                view: json_data,
                x: json_data.fields['Sort Date'],
                y_heading: "Values",
                y: [
                    ELARA.RowLineDict({
                        value: json_data.fields.Dict,
                        color: ELARA.RowKeyColor(json_data.fields.Dict),
                        tooltip: ELARA.Tooltip({
                            title: ELARA.Const("Values"),
                            values: {
                                "String 1" : json_data.fields["String 1"],
                                "Integer 1" : json_data.fields["Integer 1"],
                                "Number 1" : json_data.fields["Number 1"],
                                "Date 1" : json_data.fields["Date 1"],
                                "Boolean 1" : json_data.fields["Boolean 1"],
                            }
                        })
                    }),
                    ELARA.RowLineValue({
                        value: json_data.fields["Number 2"],
                        color: ELARA.ColorValue(),
                        tooltip: ELARA.Tooltip({
                            title: ELARA.Const("Values"),
                            values: json_data.fields
                        })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowGeoVisual({
            name: "Row Geo",
            series: ELARA.RowGeoSeries({
                view: json_data,
                lat: json_data.fields.Latitude,
                lon: json_data.fields.Longitude,
                color: ELARA.RowOrdinalColor(json_data_single_group.fields["String 1"]),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    values: json_data.fields
                })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowAreaVisual({
            name: "Row Area",
            series: ELARA.RowAreaSeries({
                view: json_data,
                x: json_data.fields["Date 3"],
                y: [
                    RowAreaDict({
                        value: json_data.fields.Dict,
                        tooltip: ELARA.Tooltip({
                            title: ELARA.Const("Values"),
                            values: {
                                "String 1" : json_data.fields["String 1"],
                                "Integer 1" : json_data.fields["Integer 1"],
                                "Number 1" : json_data.fields["Number 1"],
                                "Date 1" : json_data.fields["Date 1"],
                                "Boolean 1" : json_data.fields["Boolean 1"],
                            }
                        })
                    }),
                    RowAreaValue({
                        value: json_data.fields["Number 2"],
                        color: ELARA.ColorValue(),
                        tooltip: ELARA.Tooltip({
                            title: ELARA.Const("Values"),
                            values: json_data.fields
                        })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowScatterVisual({
            name: "Row Scatter",
            series: ELARA.RowScatterSeries({
                view: json_data,
                x: json_data.fields["Number 1"],
                y: json_data.fields["Number 3"],
                size: json_data.fields["Integer 3"],
                color: ELARA.RowOrdinalColor(json_data.fields["String 1"]),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    values: json_data.fields
                })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowTimelineVisual({
            name: "Row Timeline",
            series: ELARA.RowTimelineSeries({
                view: json_data_single_group,
                x: [
                    ELARA.RowTimelineInput({
                        start: json_data_single_group.fields["Date 1 Alt"],
                        end: json_data_single_group.fields["Date 2 Alt"],
                        color: ELARA.ColorValue(ELARA.colors.White),
                        border: ELARA.ColorValue(ELARA.colors.Gray),
                        opacity: json_data_single_group.fields["Transparent"],
                        dash: json_data_single_group.fields["Dash"],
                    }),
                    ELARA.RowTimelineInput({
                        start: json_data_single_group.fields["Date 1"],
                        end: json_data_single_group.fields["Date 2"],
                        prev_primary: json_data_single_group.fields["Prev Identifier"],
                        color: ELARA.RowOrdinalColor(json_data_single_group.fields["String 2"]),
                        label: json_data_single_group.fields["String 1"],
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
    ),
    ELARA.VisualSchema(
        ELARA.RowMarginalVisual({
            name: "Row Marginal",
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
    ),
    ELARA.VisualSchema(
        ELARA.RowTreeVisual({
            name: "Row Tree",
            series: ELARA.RowTreeSeries({ view: json_data, value: json_data.fields }),
            notes: ELARA.RowHTMLSeries({
                view: json_total,
                value: ELARA.StringJoin(["Max ", ELARA.Print(json_total.fields.Max)], "")
            })
        })
    ),
    ELARA.VisualSchema(
        ELARA.RowTableVisual({
            name: "Row Table",
            series: ELARA.RowTableSeries({ view: json_data_single_group }),
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
    ),
    ELARA.VisualSchema(
        ELARA.RowTableVisual({
            name: "Row Table (flat)",
            series: ELARA.RowTableSeries({ view: json_data }),
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
    ),
    ELARA.VisualSchema(
        ELARA.RowFormVisual({
            name: "Row Form",
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
    ),
    ELARA.VisualSchema(
        ELARA.RowListVisual({                        
            name: "Row List",
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
    ),
    ELARA.VisualSchema(
        ELARA.RowRidgelineVisual({
            name: "Row Ridgeline",
            series: ELARA.RowRidgelineSeries({
                view: json_distribution_single_group,
                x: json_distribution_single_group.fields.Value,
                z: json_distribution_single_group.fields.Probability,
                overlap: 0.25,
                color: ELARA.RowOrdinalColor(json_distribution_single_group.fields.Group),
                tooltip: ELARA.Tooltip({
                    title: json_distribution_single_group.fields.Group,
                    values: {
                        value : json_distribution_single_group.fields.Value,
                        probability : json_distribution_single_group.fields.Probability,
                    }
                })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowRidgelineVisual({
            name: "Row Ridgeline (Ungrouped)",
            series: ELARA.RowRidgelineSeries({
                view: json_data,
                x: json_data.fields['Sort Date'],
                z: json_data.fields["Number 2"],
                color: ELARA.ColorValue(),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    values: json_data.fields
                })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowHexbinVisual({
            name: "Row Hexbin",
            series: ELARA.RowHexbinSeries({
                view: json_data,
                x: json_data.fields["Number 1"],
                y: json_data.fields["Number 3"],
                color: ELARA.ColorValue(ELARA.colors.Violet),
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
    ),
    ELARA.VisualSchema(
        ELARA.RowHexbinVisual({
            name: "Row Hexbin Dict",
            series: ELARA.RowHexbinSeries({
                view: json_data,
                x: json_data.fields.Dict,
                y: json_data.fields['Dict 2'],
                color: ELARA.RowKeyColor(json_data.fields.Dict),
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

    ),
    ELARA.VisualSchema(
        ELARA.RowDistributionVisual({
            name: "Row Distribution (value)",
            series: ELARA.RowDistributionSeries({
                view: json_data,
                x: [
                    ELARA.RowDistributionValue({
                        value: json_data_single_group.fields["Number 1"],
                        color: ELARA.ColorValue(ELARA.colors.Violet),
                    }),
                    ELARA.RowDistributionValue({
                        value: json_data_single_group.fields['Number 2'],
                        color: ELARA.ColorValue(ELARA.colors.Red),
                    }),
                    ELARA.RowDistributionValue({
                        value: json_data_single_group.fields['Number 3'],
                        color: ELARA.ColorValue(ELARA.colors.Red),
                    })
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
    ),
    ELARA.VisualSchema(
        ELARA.RowDistributionVisual({
            name: "Row Distribution (dict)",
            series: ELARA.RowDistributionSeries({
                view: json_data,
                x: [
                    ELARA.RowDistributionDict({
                        value: json_data_single_group.fields.Dict,
                    }),
                    ELARA.RowDistributionValue({
                        value: json_data_single_group.fields['Number 2'],
                        color: ELARA.ColorValue(ELARA.colors.Red),
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupHeatMapVisual({
            name: "Group HeatMap",
            series: ELARA.GroupHeatMapSeries({
                view: json_data_multi_group,
                x: json_data_multi_group.aggregations["String 1 Unique"],
                y: json_data_multi_group.aggregations["String 2 Unique"],
                value: json_data_multi_group.aggregations.Sum,
                color: ELARA.GroupLinearColor(json_data_multi_group.aggregations.Sum),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields["String Combination Unique"]}</b> placed here.</p>`,
                    values: {
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
                        Sum: json_data_multi_group.fields.Sum
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupRidgelineVisual({
            name: "Group Ridgeline",
            series: ELARA.GroupRidgelineSeries({
                view: json_data_multi_group,
                x: json_data_multi_group.aggregations["String 1 Unique"],
                y: json_data_multi_group.aggregations["String 2 Unique"],
                z: json_data_multi_group.aggregations.Sum,
                overlap: 0.25,
                curve: 'curve_basis',
                color: ELARA.GroupOrdinalColor(json_data_multi_group.aggregations["String 2 Unique"]),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields["String Combination Unique"]}</b> placed here.</p>`,
                    values: {
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
                        "Sum Min": json_data_multi_group.fields["Sum Min"],
                        "Sum Max": json_data_multi_group.fields["Sum Max"],
                        Sum: json_data_multi_group.fields.Sum
                    }
                }),
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupBarVisual({
            name: "Group Bar",
            series: ELARA.GroupBarValueSeries({
                view: json_data_single_group,
                x: json_data_single_group.aggregations.Sum,
                y: json_data_single_group.aggregations["String 1 Unique"],
                color: ELARA.ColorValue(),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`
                    <p>Some great description <b>${json_data_single_group.fields.Min}</b> placed here.</p>
                    <p>Some great description <b>${json_data_single_group.fields.Min}</b> placed here.</p>
                    <p>Some great description <b>${json_data_single_group.fields.Min}</b> placed here.</p>
                    <p>Some great description <b>${json_data_single_group.fields.Min}</b> placed here.</p>
                    <p>Some great description <b>${json_data_single_group.fields.Min}</b> placed here.</p>
                    <p>Some great description <b>${json_data_single_group.fields.Min}</b> placed here.</p>
                    <p>Some great description <b>${json_data_single_group.fields.Min}</b> placed here.</p>
                    `,
                    values: {
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        Sum: json_data_multi_group.fields.Sum
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupBarVisual({
            name: "Group Bar (Stacked)",
            series: ELARA.GroupBarStackedSeries({
                view: json_data_multi_group,
                x: json_data_multi_group.aggregations.Sum,
                y: json_data_multi_group.aggregations["String 1 Unique"],
                stack: json_data_multi_group.aggregations["String 2 Unique"],
                color: ELARA.GroupOrdinalColor(json_data_multi_group.aggregations["String 2 Unique"]),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields.Sum}</b> placed here.</p>`,
                    values: {
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
                        Sum: json_data_multi_group.fields.Sum
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupFlowVisual({
            name: "Group Flow",
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupRangeVisual({
            name: "Group Range",
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupPieVisual({
            name: "Group Pie",
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupScatterVisual({
            name: "Group Scatter",
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupColumnVisual({
            name: "Group Column",
            series: ELARA.GroupColumnValueSeries({
                view: json_data_single_group,
                x: json_data_single_group.aggregations["String 1 Unique"],
                y: json_data_single_group.aggregations.Sum,
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupColumnVisual({
            name: "Group Column (Stacked)",
            series: ELARA.GroupColumnStackedSeries({
                view: json_data_multi_group,
                x: json_data_multi_group.aggregations["String 1 Unique"],
                y: json_data_multi_group.aggregations.Sum,
                stack: json_data_multi_group.aggregations["String 2 Unique"],
                color: ELARA.GroupOrdinalColor(json_data_multi_group.aggregations["String 2 Unique"]),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields.Sum}</b> placed here.</p>`,
                    values: {
                        Sum: json_data_multi_group.fields.Sum,
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupTreeMapVisual({
            name: "Group TreeMap",
            series: ELARA.GroupTreeMapSeries({
                view: json_data_single_group,
                x: json_data_single_group.aggregations["String 1 Unique"],
                value: json_data_single_group.aggregations.Sum,
                color: ELARA.GroupLinearColor(json_data_single_group.aggregations.Sum),
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupAreaVisual({
            name: "Group Area",
            series: ELARA.GroupAreaValueSeries({
                view: json_data_single_group,
                x: json_data_single_group.aggregations["String 1 Unique"],
                y: json_data_single_group.aggregations.Sum,
                color: ELARA.ColorValue(),
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupAreaVisual({
            name: "Group Area (Stacked)",
            series: ELARA.GroupAreaStackedSeries({
                view: json_data_multi_group,
                x: json_data_multi_group.aggregations["String 1 Unique"],
                y: json_data_multi_group.aggregations.Sum,
                stack: json_data_multi_group.aggregations["String 2 Unique"],
                color: ELARA.GroupOrdinalColor(json_data_multi_group.aggregations["String Combination Unique"]),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields.Sum}</b> placed here.</p>`,
                    values: {
                        Sum: json_data_multi_group.fields.Sum,
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupTableVisual({
            name: "Group Table",
            series: ELARA.GroupTableSeries({
                view: json_data_single_group,
                columns: [
                    ELARA.GroupTableColumn({
                        value: json_data_single_group.aggregations["String 1 Unique"],
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
                    ELARA.GroupTableColumn({
                        value: json_data_single_group.aggregations.Sum,
                        background: ELARA.GroupLinearColor(json_data_single_group.aggregations.Sum),
                        tooltip: ELARA.Tooltip({
                            title: ELARA.Const("Values"),
                            description: ELARA.StringJoin`<p>Some great description <b>${json_data_single_group.fields.Sum}</b> placed here.</p>`,
                            values: {
                                Sum: json_data_single_group.fields.Sum,
                                "String 1 Unique": json_data_single_group.fields["String 1 Unique"],
                            }
                        })
                    }),
                ],
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupPivotVisual({
            name: "Group Pivot",
            series: ELARA.GroupPivotSeries({
                view: json_data_multi_group,
                col_pivot: json_data_multi_group.aggregations["String 1 Unique"],
                row_pivot: json_data_multi_group.aggregations["String 2 Unique"],
                value: json_data_multi_group.aggregations.Sum,
                color: ELARA.GroupLinearColor(json_data_multi_group.aggregations.Sum),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields.Sum}</b> placed here.</p>`,
                    values: {
                        "String Combination Unique": json_data_multi_group.fields["String 1 Group"],
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
                        Sum: json_data_multi_group.fields.Sum
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupCombinedVisual({
            name: "Group Combined",
            series: ELARA.GroupCombinedSeries({
                view: json_data_single_group,
                x: json_data_single_group.aggregations["String 1 Unique"],
                line: ELARA.GroupCombinedSeriesLine({
                    y: json_data_single_group.aggregations.Sum,
                    color: ELARA.ColorValue(),
                    tooltip: ELARA.Tooltip({
                        title: ELARA.Const("Values"),
                        description: ELARA.StringJoin`<p>Some great description <b>${json_data_single_group.fields.Sum}</b> placed here.</p>`,
                        values: {
                            Sum: json_data_single_group.fields.Sum,
                            "String 1 Unique": json_data_single_group.fields["String 1 Unique"],
                        }
                    })
                }),
                column: ELARA.GroupCombinedSeriesColumn({
                    y: json_data_single_group.aggregations.Max,
                    color: ELARA.GroupOrdinalColor(json_data_single_group.aggregations["String 1 Unique"]),
                    tooltip: ELARA.Tooltip({
                        title: ELARA.Const("Values"),
                        description: ELARA.StringJoin`<p>Some great description <b>${json_data_single_group.fields.Sum}</b> placed here.</p>`,
                        values: {
                            Sum: json_data_single_group.fields.Sum,
                            "String 1 Unique": json_data_single_group.fields["String 1 Unique"],
                        }
                    })
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupLineVisual({
            name: "Group Line",
            series: ELARA.GroupLineValueSeries({
                view: json_data_single_group,
                x: json_data_single_group.aggregations["String 1 Unique"],
                y: json_data_single_group.aggregations.Sum,
                color: ELARA.ColorValue(),
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
    ),
    ELARA.VisualSchema(
        ELARA.GroupLineVisual({
            name: "Group Line (Stacked)",
            series: ELARA.GroupLineStackedSeries({
                view: json_data_multi_group,
                x: json_data_multi_group.aggregations["String 1 Unique"],
                y: json_data_multi_group.aggregations.Sum,
                stack: json_data_multi_group.aggregations["String 2 Unique"],
                color: ELARA.GroupOrdinalColor(json_data_multi_group.aggregations["String 2 Unique"]),
                tooltip: ELARA.Tooltip({
                    title: ELARA.Const("Values"),
                    description: ELARA.StringJoin`<p>Some great description <b>${json_data_multi_group.fields.Sum}</b> placed here.</p>`,
                    values: {
                        "String 1 Unique": json_data_multi_group.fields["String 1 Unique"],
                        "String 2 Unique": json_data_multi_group.fields["String 2 Unique"],
                        Sum: json_data_multi_group.fields.Sum
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
    )
)

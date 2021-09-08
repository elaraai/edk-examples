// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';

import view_plugin from '../../gen/view.plugin';

const json_data_single_group = view_plugin.view["JSON Data Single-Group"]
const json_total = view_plugin.view["JSON Total"]
const json_data = view_plugin.view["JSON Data"]

export default ELARA.PanelPageSchema({
    name: "Row One",
    container: ELARA.PanelContainer({
        size: ELARA.PanelDimension({ size: 100 }),
        orientation: 'column',
        items: [
            ELARA.PanelContainer({
                size: ELARA.PanelDimension({ size: 33 }),
                orientation: 'row',
                items: [
                    ELARA.PanelVisual({
                        name: "Line (value)",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.RowLineVisual({
                            series: ELARA.RowLineSeries({
                                view: json_data,
                                x: json_data.fields["Date 3"],
                                y_heading: "Values",
                                y: [
                                    ELARA.RowLineValue({
                                        value: json_data.fields["Number 2"],
                                        color: ELARA.ColorValue(),
                                        tooltip: ELARA.Tooltip({
                                            title: ELARA.Const("Values"),
                                            values: json_data.fields
                                        })
                                    }),
                                    ELARA.RowLineDict({
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
                                    })
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
                    ELARA.PanelVisual({
                        name: "Geo",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.RowGeoVisual({
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
                    }),
                ]
            }),
            ELARA.PanelContainer({
                size: ELARA.PanelDimension({ size: 33 }),
                orientation: 'row',
                items: [
                    ELARA.PanelVisual({
                        name: "Area (value)",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.RowAreaVisual({
                            series: ELARA.RowAreaSeries({
                                view: json_data,
                                x: json_data.fields["Date 3"],
                                y: json_data.fields["Number 2"],
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
                    }),
                    ELARA.PanelVisual({
                        name: "Scatter",
                        size: ELARA.PanelDimension({ size: 50 }),
                        visual: ELARA.RowScatterVisual({
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
                    }),
                ]
            }),
            ELARA.PanelContainer({
                size: ELARA.PanelDimension({ size: 34 }),
                orientation: 'row',
                items: [
                    ELARA.PanelVisual({
                        name: "Distribution (value)",
                        size: ELARA.PanelDimension({ size: 33 }),
                        visual: ELARA.RowDistributionVisual({
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
                    }),
                    ELARA.PanelVisual({
                        name: "Distribution (nested)",
                        size: ELARA.PanelDimension({ size: 33 }),
                        visual: ELARA.RowDistributionVisual({
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
                    }),
                    ELARA.PanelVisual({
                        name: "Hexbin",
                        size: ELARA.PanelDimension({ size: 34 }),
                        visual: ELARA.RowHexbinVisual({
                            series: ELARA.RowHexbinSeries({
                                view: json_data,
                                x: json_data.fields["Number 1"],
                                y: json_data.fields["Number 3"],
                                color: ELARA.ColorValue(),
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
            })
        ]
    }),
    grants: [],
})

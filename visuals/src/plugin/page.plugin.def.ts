// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"
import { VisualList } from "@elaraai/edk/lib";


import view_plugin from '../../gen/view.plugin';
import visual_plugin from '../../gen/visual.plugin';

const json_data_multi_group = view_plugin.view["JSON Data Multi-Group"]
const json_data_single_group = view_plugin.view["JSON Data Single-Group"]
const json_total = view_plugin.view["JSON Total"]
const json_data = view_plugin.view["JSON Data"]

export default ELARA.mergeSchemas(
    ELARA.PanelPageSchema({
        name: "Row",
        list: VisualList({
            visuals: [
                visual_plugin.visual["Row Distribution (dict)"],
                visual_plugin.visual["Row Distribution (value)"],
                visual_plugin.visual["Row Form"],
                visual_plugin.visual["Row Geo"],
                visual_plugin.visual["Row Hexbin"],
                visual_plugin.visual["Row Hexbin Dict"],
                visual_plugin.visual["Row Line"],
                visual_plugin.visual["Row List"],
                visual_plugin.visual["Row Marginal"],
                visual_plugin.visual["Row Pivot"],
                visual_plugin.visual["Row Ridgeline"],
                visual_plugin.visual["Row Ridgeline (Ungrouped)"],
                visual_plugin.visual["Row Timeline"],
                visual_plugin.visual["Row Scatter"],
            ]
        }),
        filters: {
            Date: view_plugin.view["JSON Data"].filters["Sort Date"],
            Number: view_plugin.view["JSON Data"].filters["Number 1"],
            Integer: view_plugin.view["JSON Data"].filters["Integer 1"],
            Boolean: view_plugin.view["JSON Data"].filters["Boolean 1"],
            String: view_plugin.view["JSON Data"].filters["String 1"]
        },
        load: {
            Group: ELARA.PageLoad({
                label: "By Group",
                value: [
                    ELARA.PageLoadValue(json_data.load.Group, json_data),
                    ELARA.PageLoadValue(json_data_single_group.load.Group, json_data_single_group),
                ]
            }),
            Total: json_total.load.Group
        }, 
        container: ELARA.PanelContainer({
            size: ELARA.PanelDimension({ size: 100 }),
            orientation: 'column',
            items: [
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Row Area"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Row Marginal"]
                        }),
                    ]
                }),
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Row Table"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Row Tree"]
                        }),
                    ]
                }),
            ],
        }),
        grants: [],
    }),
    ELARA.PanelPageSchema({
        name: "Group",
        load: {
            Group: ELARA.PageLoad({
                label: "By Group",
                value: [
                    ELARA.PageLoadValue(json_data_multi_group.load.Group, json_data_multi_group),
                    ELARA.PageLoadValue(json_data_single_group.load.Group, json_data_single_group),
                ]
            }),
            Total: json_total.load.Group
        },
        list: VisualList({
            visuals: [
                visual_plugin.visual["Group Flow"],
                visual_plugin.visual["Group Range"],
                visual_plugin.visual["Group Pie"],
                visual_plugin.visual["Group Combined"],
                visual_plugin.visual["Group Scatter"],
                visual_plugin.visual["Group Column"],
                visual_plugin.visual["Group Column (Stacked)"],
                visual_plugin.visual["Group TreeMap"],
                visual_plugin.visual["Group Area"],
                visual_plugin.visual["Group Area (Stacked)"],
                visual_plugin.visual["Group Table"],
                visual_plugin.visual["Group Pivot"],
                visual_plugin.visual["Group Line"],
                visual_plugin.visual["Group Line (Stacked)"]
            ]
        }),
        filters: {
            "String Range": json_data_single_group.filters['String Range'],
            "String Value": json_data_single_group.filters["String Value"],
            "Boolean": json_data_single_group.filters.Boolean,
            "Date": json_data_single_group.filters.Date,
            "Integer": json_data_single_group.filters.Integer,
            "Number": json_data_single_group.filters.Number
        },
        container: ELARA.PanelContainer({
            size: ELARA.PanelDimension({ size: 100 }),
            orientation: 'column',
            items: [
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group HeatMap"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Ridgeline"]
                        }),
                    ]
                }),
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Bar"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Bar (Stacked)"]
                        }),
                    ]
                }),
            ]
        }),
        grants: [],
    }),
)

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"


import view_plugin from '../../gen/view.plugin';
import visual_plugin from '../../gen/visual.plugin';

const json_data_multi_group = view_plugin.view["JSON Data Multi-Group"]
const json_data_single_group = view_plugin.view["JSON Data Single-Group"]
const json_total = view_plugin.view["JSON Total"]
const json_data = view_plugin.view["JSON Data"]

export default ELARA.mergeSchemas(
    ELARA.PanelPageSchema({
        name: "Row One",
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
                            visual: visual_plugin.visual["Row Line"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Row Geo"]
                        }),
                    ]
                }),
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
                            visual: visual_plugin.visual["Row Scatter"]
                        }),
                    ]
                }),
            ],
        }),
        grants: [],
    }),
    ELARA.PanelPageSchema({
        name: "Row Two",
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
                    ELARA.PageLoadValue(json_total.load.Group, json_total),
                ]
            })
        },
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
                                    size: ELARA.PanelDimension({ size: 50 }),
                                    visual: visual_plugin.visual["Row Timeline"]
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
                                    visual: visual_plugin.visual["Row Tree"]
                                }),
                                ELARA.PanelVisual({
                                    size: ELARA.PanelDimension({ size: 50 }),
                                    visual: visual_plugin.visual["Row Table"]
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
                            size: ELARA.PanelDimension({ size: 30 }),
                            visual: visual_plugin.visual["Row Form"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 70 }),
                            visual: visual_plugin.visual["Row List"]
                        }),
                    ]
                }),
            ]
        }),
        grants: [],
    }),
    ELARA.PanelPageSchema({
        name: "Row Three",
        container: ELARA.PanelContainer({
            size: ELARA.PanelDimension({ size: 100 }),
            orientation: 'column',
            items: [
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 34 }),
                            visual: visual_plugin.visual["Row Ridgeline"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 33 }),
                            visual: visual_plugin.visual["Row Hexbin"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 33 }),
                            visual: visual_plugin.visual["Row Hexbin Dict"]
                        }),
                    ]
                }),
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 25 }),
                            visual: visual_plugin.visual["Row Distribution (value)"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 25 }),
                            visual: visual_plugin.visual["Row Distribution (dict)"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Row Pivot"]
                        }),
                    ]
                })
            ]
        }),
        grants: [],
    }),
    ELARA.PanelPageSchema({
        name: "Group One",
        load: {
            Group: ELARA.PageLoad({
                label: "By Group",
                value: [
                    ELARA.PageLoadValue(json_data_multi_group.load.Group, json_data_multi_group),
                    ELARA.PageLoadValue(json_data_single_group.load.Group, json_data_single_group),
                    ELARA.PageLoadValue(json_total.load.Group, json_total),
                ]
            })
        },
        filters: {
            "String Range": json_data_single_group.filters['String Range']
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
    ELARA.PanelPageSchema({
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
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Flow"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Range"]
                        }),
                    ]
                }),
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Pie"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Scatter"]
                        }),
                    ]
                }),
            ]
        }),
        grants: [],
    }),
    ELARA.PanelPageSchema({
        name: "Group Three",
        container: ELARA.PanelContainer({
            size: ELARA.PanelDimension({ size: 100 }),
            orientation: 'column',
            items: [
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 33 }),
                            visual: visual_plugin.visual["Group Column"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 33 }),
                            visual: visual_plugin.visual["Group Column (Stacked)"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 34 }),
                            visual: visual_plugin.visual["Group TreeMap"]
                        }),
                    ]
                }),
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Area"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Area (Stacked)"]
                        }),
                    ]
                }),
            ]
        }),
        grants: [],
    }),
    ELARA.PanelPageSchema({
        name: "Group Four",
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
                            visual: visual_plugin.visual["Group Table"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Pivot"]
                        }),
                    ]
                }),
                ELARA.PanelContainer({
                    size: ELARA.PanelDimension({ size: 50 }),
                    orientation: 'row',
                    items: [
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Line"]
                        }),
                        ELARA.PanelVisual({
                            size: ELARA.PanelDimension({ size: 50 }),
                            visual: visual_plugin.visual["Group Line (Stacked)"]
                        }),
                    ]
                }),
            ]
        }),
        grants: [],
    })

)

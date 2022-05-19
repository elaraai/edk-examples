// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import {
  ApplicationPlugin,
  Const,
  DataSourcePlugin,
  mergeSchemas,
  MLFunctionPlugin,
  PanelContainer,
  PanelDimension,
  PanelPageSchema,
  PanelVisual,
  PipelinePlugin,
  PredictionPlugin,
  Schema,
  StatusPlugin,
  SuperUser,
} from '@elaraai/edk/lib';

import allocations_pipeline from '../../gen/allocations.pipeline';
import availability_source from '../../gen/availability.source';
import delegation from '../../gen/delegation.structure';
import delegations_pipeline from '../../gen/delegations.pipeline';
import policy_source from '../../gen/policy.source';
import queues_source from '../../gen/queues.source';
import service_begin from '../../gen/service_begin.structure';
import staff_source from '../../gen/staff.source';
import visuals_plugin from '../../gen/visuals.plugin';
import work_source from '../../gen/work.source';

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
                                    size: PanelDimension({ size: 50 }),
                                    visual: visuals_plugin.visual["Daily Revenue"]
                                }),
                                PanelVisual({
                                    size: PanelDimension({ size: 50 }),
                                    visual: visuals_plugin.visual["Time to Service"]
                                }),
                            ],
                        }),
                        PanelContainer({
                            size: PanelDimension({ size: 50 }),
                            orientation: 'row',
                            items: [
                                PanelVisual({
                                    size: PanelDimension({ size: 50 }),
                                    visual: visuals_plugin.visual['Efficiency Improvement Priorities']
                                }),
                                PanelVisual({
                                    size: PanelDimension({ size: 50 }),
                                    visual: visuals_plugin.visual["Queue Size"]
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
            "Prediction Performance": PredictionPlugin(),
            Status: StatusPlugin(),
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
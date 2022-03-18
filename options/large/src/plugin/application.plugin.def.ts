// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import {
  ApplicationPlugin,
  Const,
  DataSourcePlugin,
  mergeSchemas,
  MLFunctionPlugin,
  OptionsPlugin,
  PipelinePlugin,
  PredictionPlugin,
  Schema,
  SimulationPlugin,
  StatusPlugin,
  SuperUser,
} from '@elaraai/edk/lib';

import baseline_scenario from '../../gen/baseline.scenario';
import flow_pipeline from '../../gen/flow.pipeline';
import flow from '../../gen/flow.structure';
import range_source from '../../gen/range.source';
import stuff from '../../gen/stuff.structure';

export default Schema(
    ApplicationPlugin({
        name: "Large Example",
        schemas: {
            Options: OptionsPlugin({
                name: "flow",
                entity: flow,
                scenario: baseline_scenario,
                options: {
                    inflow: flow.properties.inflow,
                },
                values: {
                    datetime: flow.date,
                    current_stuff: flow.properties.current_stuff,
                    outflow: flow.properties.outflow,
                },
                output_entity: stuff,
                output: stuff.properties.balance,
            }),
            Datasource: DataSourcePlugin({
                datasources: [range_source]
            }),
            Pipeline: PipelinePlugin({
                pipelines: [flow_pipeline]
            }),
            Predictions: mergeSchemas(
                SimulationPlugin({
                    name: "Flow Results",
                    entity: flow,
                    properties: {
                        ...flow.properties,
                        new_stuff: flow.events.flow.value
                    },
                    ml: false,
                }),
                SimulationPlugin({
                    name: "Cash Results",
                    entity: stuff,
                    properties: stuff.properties,
                })
            ),
            'Machine Learning': MLFunctionPlugin({
                func: flow.properties.outflow.function
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
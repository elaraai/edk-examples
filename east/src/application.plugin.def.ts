// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  ApplicationPlugin,
  Const,
  PipelinePlugin,
  PredictionPlugin,
  StatusPlugin,
  SuperUser,
} from '@elaraai/edk/lib';

import pipeline from '../gen/pipeline.pipeline';
import results_plugin from '../gen/results.plugin';

export default ELARA.Schema(
    ApplicationPlugin({
        name: 'Expressions Example',
        schemas: {
            Pipeline: PipelinePlugin({
                pipelines: [pipeline]
            }),
            Structure: PipelinePlugin({
                pipelines: results_plugin.pipeline,
                prepend: "structure"
            }),
            Prediction: PredictionPlugin(),
            Status: StatusPlugin(),
        },
        users: [
            SuperUser({
                email: 'admin@example.com',
                name: 'Admin',
                password: Const('admin'),
            })
        ],
    })
)

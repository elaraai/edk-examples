// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, DataSourcePlugin, Environment, EnvironmentVariable, mergeSchemas, MLFunctionPlugin, OptionsPlugin, PipelinePlugin, SuperUser } from "@elaraai/edk/lib"

import covid from '../../gen/covid.source';
import purchases from '../../gen/purchases.source';
import rosters from '../../gen/rosters.source';
import sales from '../../gen/sales.source';
import shifts from '../../gen/shifts.source';
import structure_pipelines from '../../gen/structure_pipelines.plugin';
import time_aggregate from '../../gen/time_aggregate.plugin';
import time_cycle from '../../gen/time_cycle.plugin';
import sales_structure from '../../gen/sales.structure'
import money_structure from '../../gen/money.structure'
import products_structure from '../../gen/products.structure'
import baseline from '../../gen/baseline.scenario'


export default ELARA.Schema(
    ApplicationPlugin({
        name: "Gift Shop",
        schemas: {
            Datasources: DataSourcePlugin({
                datasources: [covid, purchases, rosters, sales, shifts],
                prepend: 'Datasource'
            }),
            Pipelines: mergeSchemas(
                PipelinePlugin({
                    pipelines: structure_pipelines.pipeline,
                    prepend: 'Structure'
                }),
                PipelinePlugin({
                    pipelines: time_aggregate.pipeline,
                    prepend: 'Time Aggregate'
                }),
                PipelinePlugin({
                    pipelines: time_cycle.pipeline,
                    prepend: 'Time Cycle',
                })
            ),
            MachineLearning: MLFunctionPlugin({
                func: sales_structure.properties.TotalQty.function,
                prepend: 'ML'
            }),
            Options: OptionsPlugin({
                name: "Product",
                scenario: baseline,
                entity: products_structure,
                options: {
                    ProductPrices: products_structure.properties.Price
                },
                output: money_structure.properties.Balance,
                output_entity: money_structure,
            })
        },
        users: [
            SuperUser({
                email: 'support@elara.ai',
                name: 'Admin',
                password: Environment('ADMIN_PASSWORD'),
            })
        ],
        environments: [
            EnvironmentVariable({ name: 'ADMIN_PASSWORD' })
        ],
    })
)

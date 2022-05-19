// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { ApplicationPlugin, Const, DataSourcePlugin, mergeSchemas, MLFunctionPlugin,  PipelinePlugin, SimulationPlugin, StatusPlugin, SuperUser } from "@elaraai/edk/lib"
import covid from '../../gen/covid.source';
import purchases from '../../gen/purchases.source';
import rosters from '../../gen/rosters.source';
import sales from '../../gen/sales.source';
import shifts from '../../gen/shifts.source';
import structure_pipelines from '../../gen/structure_pipelines.plugin';
import time_aggregate from '../../gen/time_aggregate.plugin';
import time_cycle from '../../gen/time_cycle.plugin';
import sales_structure from '../../gen/sales.structure'
import products_structure from '../../gen/products.structure'
import promotions_structure from '../../gen/promotions.structure'
import purchases_structure from '../../gen/purchases.structure'
import supplies_structure from '../../gen/supplies.structure'

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
            Simulation: mergeSchemas(
                SimulationPlugin({
                    name: "Sales Results",
                    entity: sales_structure,
                    properties: sales_structure.properties
                }),
                SimulationPlugin({
                    name: "Products Results",
                    entity: products_structure,
                    properties: products_structure.properties
                }),
                SimulationPlugin({
                    name: "Supplies Results",
                    entity: supplies_structure,
                    properties: supplies_structure.properties
                }),
                SimulationPlugin({
                    name: "Promotions Results",
                    entity: promotions_structure,
                    properties: promotions_structure.properties
                }),
                SimulationPlugin({
                    name: "Purchases Results",
                    entity: purchases_structure,
                    properties: purchases_structure.properties
                }),
            ),
            MachineLearning: MLFunctionPlugin({
                func: sales_structure.properties.Qty.function,
                prepend: 'ML'
            }),
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

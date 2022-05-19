// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import {
  ApplicationPlugin,
  Const,
  DataSourcePlugin,
  mergeSchemas,
  PredictionPlugin,
  Schema,
  SimulationPlugin,
  StatusPlugin,
  SuperUser,
} from '@elaraai/edk/lib';

import cash from '../../gen/cash.structure';
import invoices_source from '../../gen/invoices.source';
import payment from '../../gen/payment.structure';
import supplier from '../../gen/supplier.structure';
import suppliers_source from '../../gen/suppliers.source';
import work_source from '../../gen/work.source';
import work from '../../gen/work.structure';

export default Schema(
    ApplicationPlugin({
        name: "Sensitivity Example",
        schemas: {
            Predictions: mergeSchemas(
                SimulationPlugin({
                    name: "Work Results",
                    entity: work,
                    marker: "work marker",
                    properties: work.properties,
                }),
                SimulationPlugin({
                    name: "Cash Results",
                    entity: cash,
                    marker: "account",
                    properties: cash.properties,
                }),
                SimulationPlugin({
                    name: "Supplier Results",
                    entity: supplier,
                    properties: supplier.properties,
                }),
                SimulationPlugin({
                    name: "Payment Results",
                    entity: payment,
                    properties: payment.properties,
                })
            ),
            Datasources: DataSourcePlugin({
                datasources: [
                    invoices_source,
                    suppliers_source,
                    work_source
                ]
            }),
            Prediction: PredictionPlugin(),
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

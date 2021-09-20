// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import { Schema, SimulationPlugin, mergeSchemas } from '@elaraai/edk/lib';

import queues from '../../gen/queues.structure'
import service_begin from '../../gen/service_begin.structure'
import sale from "../../gen/sale.structure"

export default Schema(
    mergeSchemas(
        SimulationPlugin({
            name: "Sale Simulation",
            entity: sale,
            properties: sale.properties,
            marker: 'marker'
        }),
        SimulationPlugin({
            name: "Queue Simulation",
            entity: queues,
            properties: queues.properties,
            marker: 'marker',
            ml: false
        }),
        SimulationPlugin({
            name: "Service Begin Simulation",
            entity: service_begin,
            marker: 'marker',
            ml: false,
            properties: service_begin.properties,
        }),
    )
)

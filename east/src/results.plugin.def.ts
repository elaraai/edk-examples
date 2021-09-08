// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import process from "../gen/process.structure"

export default ELARA.SimulationPlugin({
    name: "results",
    entity: process,
    properties: process.properties
})

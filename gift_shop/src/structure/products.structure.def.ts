// © Copyright 2018- 2022 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  Const,
  Temporal,
} from '@elaraai/edk/lib';

import structure_pipeline_plugin from '../../gen/structure_pipelines.plugin';

const products = structure_pipeline_plugin.pipeline.Products.output_table

export default ELARA.ResourceStructureSchema({
    concept: "Products",
    mapping: {
        input_table: products,
        properties: {
            Discount: Temporal({
                initial_value: Const(1.0),
            }),
            Price: products.fields.Price,
            Qty: Temporal({
                initial_value: Const(0n),
            }),
        }
    },
})

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  DictType,
  GetProperties,
  GreaterEqual,
  MapDict,
  Option,
  ProcessMapping,
  Property,
  Variable,
} from '@elaraai/edk/lib';

import baseline from '../../gen/baseline.scenario';
import products from '../../gen/products.structure';
import structure_pipeline_plugin from '../../gen/structure_pipelines.plugin';

const promotions = structure_pipeline_plugin.pipeline.Promotions.output_table

// TODO this just sets a flat discount across all products for a day
export default ELARA.ProcessStructureSchema({
    concept: "Promotions",
    mapping: ProcessMapping({
        input_table: promotions,
        date: promotions.fields.Date,
        properties: {
            DailyCycle: promotions.fields.DailyCycle,
            WeeklyCycle: promotions.fields.WeeklyCycle,
            CurrentDiscounts: GetProperties({ property: products.properties.Discount }),
            Prices: GetProperties({ property: products.properties.Price }),
            Discount: Option({
                default_value: promotions.fields.MeanSalesPrice,
                manual: [{
                    scenario: baseline,
                    min: 0.0,
                    max: 10.0,
                }],
                sensitivity: [{
                    scenario: baseline,
                    min: 0.8,
                    max: 1.2,
                }]
            }),
        },
        events: { 
            SetDiscount: {
                property: products.properties.Discount,
                values: MapDict(
                    Property("CurrentDiscounts", DictType("float")),
                    Property("Discount", "float"),
                    Variable("_", "float")
                ),
            }
        },
        filter: GreaterEqual(promotions.fields.DailyCycle, 0n),
    })
})
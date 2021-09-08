// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from "@elaraai/edk/lib"

import { CollectDictMean, CollectDictSum, Maximum, Multiply, Sum, TimeAggregatePlugin, TimeAggregation } from "@elaraai/edk/lib"

import covid from '../../gen/covid.source';
import purchases from '../../gen/purchases.source';
import sales from '../../gen/sales.source';

export default ELARA.Schema(
    TimeAggregatePlugin({
        inputs: {
            TotalWeeklySales: TimeAggregation({
                table: sales.output,
                value: sales.output.fields.Date,
                unit: 'week',
                aggregations: {
                    TotalSalesQty: CollectDictSum(sales.output.fields.Product, 1n),
                }
            }),
            TotalHourlySales: TimeAggregation({
                table: sales.output,
                value: sales.output.fields.Date,
                unit: 'hour',
                aggregations: {
                    TotalSalesQty: CollectDictSum(sales.output.fields.Product, 1n),
                    MeanProductPrice: CollectDictMean(
                        sales.output.fields.Product,
                        sales.output.fields.Price
                    ),
                }
            }),
            TotalWeeklyPurchases: TimeAggregation({
                table: purchases.output,
                value: purchases.output.fields.Date,
                unit: 'week',
                aggregations: {
                    TotalPurchaseQty: CollectDictSum(
                        purchases.output.fields.Item,
                        purchases.output.fields.Qty
                    ),
                    TotalPurchaseAmount: CollectDictSum(
                        purchases.output.fields.Item,
                        Multiply(
                            purchases.output.fields.Qty,
                            purchases.output.fields.Cost
                        )
                    )
                }
            }),
            TotalWeeklyCovid: TimeAggregation({
                table: covid.output,
                value: covid.output.fields.Date,
                unit: 'week',
                aggregations: {
                    TotalCovidCases: Sum(covid.output.fields.CovidCases),
                }
            }),
            TotalDailyCovid: TimeAggregation({
                table: covid.output,
                value: covid.output.fields.Date,
                unit: 'day',
                aggregations: {
                    TotalCovidCases: Maximum(covid.output.fields.CovidCases),
                }
            })
        }
    })
)

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import * as ELARA from '@elaraai/edk/lib';
import {
  AddDuration,
  GetProperty,
  Multiply,
  ProcessDate,
  Property,
  Subtract,
} from '@elaraai/edk/lib';

import cash from '../../gen/cash.structure';
import invoices_source from '../../gen/invoices.source';
import supplier from '../../gen/supplier.structure';

const invoices = invoices_source.output

export default ELARA.ProcessStructureSchema({
    concept: "payment",
    mapping: {
        input_table: invoices,
        date: invoices.fields.date,
        properties: {
            supplier: invoices.fields.supplier,
            work: GetProperty({
                property: supplier.properties.work,
                marker: Property('supplier', 'string')
            }),
            rate: GetProperty({
                property: supplier.properties.rate,
                marker: Property('supplier', 'string')
            }),
            terms: GetProperty({
                property: supplier.properties.terms,
                marker: Property('supplier', 'string')
            }),
            invoice_date: ProcessDate(),
            payment_date: AddDuration(ProcessDate(), Property('terms', 'float'), 'week'),
            amount: Multiply(Property('rate', 'float'), Property('work', 'float')),
            balance: GetProperty({ property: cash.properties.balance }),
        },
        events: {
            // reset the total of work
            reset_work: {
                property: supplier.properties.work,
                marker: Property('supplier', 'string'),
                date: ProcessDate(),
                value: 0.0
            },
            // pay for the work the invoice date plus payment terms
            pay_work: {
                property: cash.properties.balance,
                date: Property('payment_date', 'datetime'),
                value: Subtract(Property('balance', 'float'), Property('amount', 'float')) 
            },
        },
    }
})

// © Copyright 2018- 2021 - Elara AI Pty Ltd ACN 627 124 903
import { mapValues, reduceValues } from '@elaraai/elara'
import fs from 'fs'

type Supplier = {
    name: string,
    terms: number,
    subcontractors: string[],
    rate: number
}

type Work = {
    id: string,
    date: string,
    hours: number
    subcontractor: string,
    supplier: string,
}

type Invoice = {
    id: string,
    date: string,
    supplier: string
}

// some functions for working with dates
let durationDays = (start: Date, end: Date) => {
    return (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
}

let durationWeeks = (start: Date, end: Date) => {
    return (end.getTime() - start.getTime()) / (1000 * 3600 * 24 * 7);
}

let addDays = (date: Date, days: number) => {
    let ret = new Date(date.valueOf());
    ret.setDate(date.getDate() + days)
    return ret;
}
let addWeeks = (date: Date, weeks: number) => {
    let ret = new Date(date.valueOf());
    ret.setDate(date.getDate() + (weeks * 7))
    return ret;
};


let start_date = new Date('2021-09-13T09:00:00Z')
let end_date = addWeeks(start_date, 8)

// suppliers
let suppliers: Supplier[] = [
    { name: "A", terms: 1.5, subcontractors: ["A1", "A2", "A3", "A4"], rate: Math.floor(Math.random() * 15) + 15 + Math.random() },
    { name: "B", terms: 2.5, subcontractors: ["B1", "B2"], rate: Math.floor(Math.random() * 15) + 15 + Math.random() },
    { name: "C", terms: 1.0, subcontractors: ["C1"], rate: Math.floor(Math.random() * 15) + 15 + Math.random() },
    { name: "D", terms: 3.0, subcontractors: ["D1", "D2", "D3"], rate: Math.floor(Math.random() * 15) + 15 + Math.random() },
    { name: "E", terms: 4.0, subcontractors: ["E1", "E2", "E3", "E4"], rate: Math.floor(Math.random() * 15) + 15 + Math.random() }
]

// console.log({ start_date, end_date })
// console.log({ weeks: durationWeeks(start_date, end_date), days: durationDays(start_date, end_date) })

// console.log({ invoices })

let work: Work[] = []
let reconcile: Record<string, Record<string, number>> = reduceValues(suppliers, supplier => supplier.name, () => ({ })) as unknown as Record<string, Record<string, number>>
for (let day = 0, week = 0; day < durationDays(start_date, end_date); day++) {
    let date = addDays(start_date, day);
    // work only occurs on week days
    if (date.getDay() !== 6 && (date.getDay() !== 0)) {
        console.log(`Day ${day} in week ${week}`, date) 
        for (let supplier of suppliers) {
            for (let subcontractor of supplier.subcontractors) {
                let hours = Math.floor(Math.random() * 8) + Math.random() 
                let amount = hours * supplier.rate
                // all subcontractors work, hours is random between 1-8
                work.push({ 
                    id: `${day}.${supplier.name}.${subcontractor}`, 
                    date: date.toISOString(), 
                    subcontractor, 
                    supplier: supplier.name, 
                    hours 
                })
                // console.log({ week})
                // add to the weekly total for this supplier
                reconcile[supplier.name] = { ...reconcile[supplier.name], [addWeeks(start_date, week + supplier.terms).toISOString()]: amount }
            }
        }
    } else if(date.getDay() === 6) {
        // move to the next week
        week++;
    }
}
// console.log({ work })
let invoices: Invoice[] = []
for (let week = 0; week < durationWeeks(start_date, end_date); week++) {
    let date = addWeeks(start_date, week);
    for (let supplier of suppliers) {
        // plan one invoice per week per supplier
        invoices.push({ 
            id: `${week}.${supplier.name}`, 
            date: addDays(date, 6).toISOString(),
            supplier: supplier.name 
        })
    }
    console.log(`Week ${week}`, date, addDays(date, 6))
}


// sense check, total spend over each week
console.log({ reconcile })

fs.writeFileSync('files/suppliers.jsonl', suppliers.map(supplier => JSON.stringify(supplier)).join('\r\n'))
fs.writeFileSync('files/invoices.jsonl', invoices.map(invoice => JSON.stringify(invoice)).join('\r\n'))
fs.writeFileSync('files/work.jsonl', work.map(work => JSON.stringify(work)).join('\r\n'))
fs.writeFileSync('files/reconcile.jsonl', JSON.stringify(reconcile))
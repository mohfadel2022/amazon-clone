import { formatCurrency } from '../js/utils.js'


console.group('Test suite: formatCurrency');
console.log('Converts cents to currency:')
const t1 = (formatCurrency(2095) === '20.95')? 'passed': 'failed'

if(formatCurrency(2095) === '20.95'){
    console.info('passed')
}else{
    console.error('failed')
}

console.log('Works with 0:')
const t2 = (formatCurrency(0) === '0.00')? 'passed': 'failed'

console.log('Rounds up to the nearest cent:')
const t3 = (formatCurrency(2000.5) === '20.01')? 'passed': 'failed'

if(formatCurrency(2000.5) === '20.01'){
    console.info('passed')
}else{
    console.error('failed')
}

console.log('Rounds down to the nearest cent:')
const t4 = (formatCurrency(2000.4) === '20.00')? 'passed': 'failed'
if(formatCurrency(2000.4) === '20.00'){
    console.info('passed')
}else{
    console.error('failed')
}
console.groupEnd();

let tests = [
    ['Converts cents to currency', t1],
    ['works with 0', t2],
    ['Rounds up to the nearest cent', t3],
    ['Rounds down to the nearest cent', t4],
]
console.table(tests);
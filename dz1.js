import colors from 'colors'

const [from, to] = process.argv.slice(2).map(item => parseInt(item))

if (isNaN(from) || isNaN(to)) {
    console.error(colors.red('Incorrect numers'))
    process.exit(0)
}

const { green, yellow, red } = colors;
const collection = [green, yellow, red]
let idx = 0
const colorPrin = (num) => {
    console.log(collection[idx](num))
    if (idx === collection.length - 1) {
        idx = 0
    } else {
        idx++
    }
}

const isPrim = (num) => {
    if(num < 2) {
        return false
    }
    let i = 2
    while(i < num) {
        if (num % i === 0) return false
        i++
    }
    return true
}

let exists = false
let i = from
while(i <= to) {
    if (isPrim(i)) {
        colorPrin(i)
        exists = true
    }
    i++
}

if (!exists) {
    console.log(red('No digital diapason'))
}
import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })
const print = console.log.bind(console)

// ------ Everything above this line will get cut when running copy script

// ------ UTILS

// Log args and return them
function _d<T>(arg: T): T
function _d<T>(...args: T[]): T[]
function _d(...args: any) {
  console.error(...args)
  return args
}

// Read input, log it and return it. `toString()` for SpiderMonkey compatibility.
const _readline = () => _d(readline()).toString()

// ------ SCRIPT

type Position = { longitude: number; latitude: number }
type Location = { name: string; distance: number } & Position

const degreesStrToFloat = (str: string) => parseFloat(str.replace(',', '.'))

const distance = (a: Position, b: Position) => {
  const x = (b.longitude - a.longitude) * Math.cos((a.latitude + b.latitude) / 2)
  const y = b.latitude - a.latitude
  return Math.sqrt(x ** 2 + y ** 2) * 6371
}

const userPosition: Position = { longitude: degreesStrToFloat(readline()), latitude: degreesStrToFloat(readline()) }
const n: number = parseInt(readline())

let closest: Location = { distance: Infinity } as Location
for (let i = 0; i < n; i++) {
  const [, name, , , longitudeRaw, latitudeRaw] = readline().split(';')
  const locationPosition: Position = {
    longitude: degreesStrToFloat(longitudeRaw),
    latitude: degreesStrToFloat(latitudeRaw)
  }

  const d = distance(userPosition, locationPosition)
  if (closest.distance > d) closest = { ...locationPosition, name, distance: d }
}

console.log(closest.name)

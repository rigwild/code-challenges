import readlineSync from 'readline-sync'

const readline = () => readlineSync.prompt({ encoding: 'utf-8', prompt: '' })

// ------ Everything above this line will get cut when running copy script

const [speed, lightCount] = [readline(), readline()].map(x => +x)

type Light = { distance: number; duration: number }
let lights: Light[] = []

for (let i = 0; i < lightCount; i++) {
  const [distance, duration] = readline()
    .split(' ')
    .map(x => +x)
  lights.push({ distance, duration })
}

const isRed = (speed: number, light: Light) =>
  (18 * light.distance) % (10 * speed * light.duration) >= 5 * speed * light.duration

let currentSpeed = speed
for (; currentSpeed > 0; --currentSpeed) {
  let ok = true
  for (let i = 0; i < lightCount; i++) {
    if (isRed(currentSpeed, lights[i])) {
      ok = false
      break
    }
  }
  if (ok) break
}
console.log(currentSpeed)

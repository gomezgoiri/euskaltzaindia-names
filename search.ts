// Colors in console: https://blog.logrocket.com/using-console-colors-node-js/
// Or simply: https://www.geeksforgeeks.org/javascript/how-to-add-colors-to-javascript-console-outputs/
// ANSI colors: https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797

const RESET = "\x1b[0m"

const BLACK = "\x1b[30m"
const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const YELLOW = "\x1b[33m"
const BLUE = "\x1b[34m"
const MAGENTA = "\x1b[35m"
const CYAN = "\x1b[36m"
const WHITE = "\x1b[37m"

const DISCARD_IF_DESC_INCLUDES = [
  "arana",
  "eleizalde",
  "navarro villoslada",
  "grieg",
  "godo",
  "apóstol",
  "judí",
  "musulman",
  "cristian",
]

const filterByWord = (name, word) => name.desc.toLowerCase().includes(word)

function printName(nm) {
  console.log(`${BLUE}%s${RESET}\n\t%s\n`, nm.name, nm.desc)
}

const names = JSON.parse(await Deno.readTextFile("names.json"))

const paraNinio = names.filter((n) => n.sex !== "femenino").filter((n) => {
  const uniformized = n.desc.toLowerCase()
  return DISCARD_IF_DESC_INCLUDES.every((d) => !uniformized.includes(d))
})

console.log(paraNinio.length)

const medievales = paraNinio.filter((n) =>
  n.desc.includes("medieva") || n.desc.toLowerCase().includes("edad media")
)
const alaveses = paraNinio.filter((n) => filterByWord(n, "araba"))
const toponimias = paraNinio.filter((n) => n.desc.includes("topo"))
const montes = paraNinio.filter((n) => n.desc.includes("monte"))

montes.forEach(printName)

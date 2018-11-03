const os = require('os')
const path = require('path')
const fs = require('fs')
const util = require('util')

const colors = {
  yellow: '\u001B[33m',
  reset: '\u001B[0m'
}

const q = (...args) => {
  const enableColors = !process.env.NO_COLOR

  const time = new Date().toISOString().slice(11, 19)
  const colorizedTime = enableColors ? `${colors.yellow}${time}${colors.reset}` : time

  const dir = process.env.TMPDIR || os.tmpdir()
  const file = path.join(dir, 'q')

  const data = args.length === 0
    ? undefined
    : args.map(arg => util.inspect(arg, {
      colors: enableColors,
      depth: null,
      maxArrayLength: null,
      showProxy: true,
      breakLength: -1
    })).join(', ')

  fs.writeFileSync(
    file,
    `${colorizedTime} ${data}${os.EOL}`,
    { flag: 'a' })
}

// Quick way to generate some dummy output
if (require.main === module) {
  q()
  q(undefined)
  q(null)
  q(true)
  q(42)
  q('a string')
  q(new Date())
  q([])
  q([1])
  q([1, 2])
  q({})
  q({ foo: 'bar' })
  q({ foo: 'bar', baz: 'qix' })
  q({ foo: [1, 2] })
  q({ foo: [{ 'bar': true }, { 'baz': ['qix', 42] }] })
  q(true, false)
  q('foo', { foo: 'bar', baz: 'qix' })
}

module.exports = q

const os = require('os')
const path = require('path')
const fs = require('fs')
const util = require('util')

const q = (...args) => {
  const time = new Date().toISOString().slice(11, 19)
  const dir = process.env.TMPDIR || os.tmpdir()
  const file = path.join(dir, 'q')

  const data = args.length === 0
    ? undefined
    : args.map(arg => util.inspect(arg, {
      colors: process.env.Q_COLOR !== 'false',
      depth: null,
      maxArrayLength: null,
      showProxy: true,
      breakLength: -1
    })).join(', ')

  fs.writeFileSync(
    file,
    `${time} ${data}${os.EOL}`,
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

module.exports = {
  q
}

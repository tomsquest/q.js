# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.6.0] - 2019-05-31

### Added

- Feat: log file and code location from where q() was invoked.

For example:

```
8:58:14 AM /home/tom/Dev/code.js:19:15 > MyClass.myMethod()
{
  foo: "bar"
}
```

## [1.5.1] - 2019-05-20

### Fixed

- Fix 1.5.0 that was empty (dist folder was not built before publishing)

## [1.5.0] - 2021-05-20

### Added

- Do nothing when running in production (`NODE_ENV=production`). This will prevent errors if calls to Q have been shipped to a production environment.

## [1.4.2] - 2019-03-24

### Fixed

- Do not publish test

## [1.4.1] - 2019-03-24

### Fixed

- Switch to building with only TSC, far simpler

## [1.4.0] - 2019-03-24

### Fixed

- Sometimes, the type definition file (.d.ts) was invalid (no completion in Intellij IDEA), so the code was rewritten to
  typescript and is bundled with [pika/pack](https://github.com/pikapkg/pack)

## [1.3.1] - 2018-11-24

### Fixed

- `q` was not exported as intended, this makes `require('qqd').q('Hello')` works

## [1.3.0] - 2018-11-24

### Changed

- Update Node to latest LTS (10.13.0)

## [1.2.0] - 2018-11-03

### Added

- Include a Typescript Type Definition, helps IDE know the params and return of the Q function

### Changed

- Honor [NO_COLOR environment variable](https://no-color.org)

## [1.1.0] - 2018-10-13

### Added

- Print time in yellow

### Changed

- Only print time not datetime

## [1.0.0] - 2018-10-12

### Added

- Print params to `$TMP_DIR/q`

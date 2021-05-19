import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { q } from "./q";

test("no arg", () => {
  q();

  expect(qContent()).toMatch(/\d{2}:\d{2}:\d{2} /);
});

test("undefined", () => {
  q(undefined);

  expect(qContent()).toMatch(/\d{2}:\d{2}:\d{2} undefined/);
});

test("[]", () => {
  q([]);

  expect(qContent()).toMatch(/\[]/);
});

test("{}", () => {
  q({});

  expect(qContent()).toMatch(/{}/);
});

test("a string", () => {
  q("a string");

  expect(qContent()).toMatch(/\d{2}:\d{2}:\d{2} 'a string'/);
});

test("many values", () => {
  q(true, 42, "foo");

  expect(qContent()).toMatch(/\d{2}:\d{2}:\d{2} true, 42, 'foo'/);
});

test("an array", () => {
  q([true, 42, "foo"]);

  expect(qContent()).toMatch(
    /\d{2}:\d{2}:\d{2} \[\r?\n|\r {2}true,\r?\n|\r {2}42,\r?\n|\r {2}'foo'\r?\n|\r]/
  );
});

test("a simple object", () => {
  q({ foo: "bar" });

  expect(qContent()).toMatch(
    /\d{2}:\d{2}:\d{2} {\r?\n|\r {2}foo: 'bar'\r?\n|\r}/
  );
});

test("a complex object", () => {
  q({ foo: ["bar", "qix"], bar: { child: true } });

  expect(qContent()).toMatch(
    /\d{2}:\d{2}:\d{2} {\r?\n|\r {2}foo: \r?\n|\r {2}\[ 'bar',\r?\n|\r {2}qix' ],\r?\n|\r {2}bar:\r?\n|\r {2}{ child: true } }/
  );
});

beforeEach(() => {
  process.env.TMPDIR = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
  process.env.NO_COLOR = "yes, it helps testing";
});

afterEach(() => {
  fs.unlinkSync(path.join(process.env.TMPDIR!, "q"));
  fs.rmdirSync(process.env.TMPDIR!);
});

const qContent = () => {
  return fs.readFileSync(path.join(process.env.TMPDIR!, "q"), "utf-8");
};

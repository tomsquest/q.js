import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { q } from "./q";
import * as time from "./time";

let tmpDir: string;

beforeEach(() => {
  process.env.TMPDIR = tmpDir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
  process.env.NO_COLOR = "disable color in test";
  jest.spyOn(time, "time").mockReturnValue("01:02:03");
});

afterEach(() => {
  fs.unlinkSync(path.join(tmpDir, "q"));
  fs.rmdirSync(tmpDir);
});

const qContent = (): [string, string[]] => {
  const content = fs.readFileSync(path.join(tmpDir, "q"), "utf-8");
  const [header, ...body] = content.split(os.EOL);
  return [header, body.slice(0, -1)];
};

test("header", () => {
  q();

  const [header] = qContent();
  expect(header).toMatch(/01:02:03 (.+?)q.test.ts:\d+:\d+ > /);
});

test("no arg", () => {
  q();

  const [, body] = qContent();
  expect(body).toEqual(["undefined"]);
});

test("undefined", () => {
  q(undefined);

  const [, body] = qContent();
  expect(body).toEqual(["undefined"]);
});

test("[]", () => {
  q([]);

  const [, body] = qContent();
  expect(body).toEqual(["[]"]);
});

test("{}", () => {
  q({});

  const [, body] = qContent();
  expect(body).toEqual(["{}"]);
});

test("a string", () => {
  q("a string");

  const [, body] = qContent();
  expect(body).toEqual(["'a string'"]);
});

test("many values", () => {
  q(true, 42, "foo");

  const [, body] = qContent();
  expect(body).toEqual(["true, 42, 'foo'"]);
});

test("an array", () => {
  q([true, 42, "foo"]);

  const [, body] = qContent();
  expect(body).toEqual(["[", "  true,", "  42,", "  'foo'", "]"]);
});

test("a simple object", () => {
  q({ foo: "bar" });

  const [, body] = qContent();
  expect(body).toEqual(["{", "  foo: 'bar'", "}"]);
});

test("a complex object", () => {
  q({
    foo: ["bar", "qix"],
    bar: { child: true },
  });

  const [, body] = qContent();
  expect(body).toEqual([
    "{",
    "  bar: {",
    "    child: true",
    "  },",
    "  foo: [",
    "    'bar',",
    "    'qix'",
    "  ]",
    "}",
  ]);
});

import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";

const colors = {
  yellow: "\u001B[33m",
  reset: "\u001B[0m",
};

export function q(...args: any[]): void {
  const enableColors = !process.env.NO_COLOR;

  const time = new Date().toISOString().slice(11, 19);
  const colorizedTime = enableColors
    ? `${colors.yellow}${time}${colors.reset}`
    : time;

  const dir = process.env.TMPDIR || os.tmpdir();
  const file = path.join(dir, "q");

  const data =
    args.length === 0
      ? undefined
      : args
          .map((arg) =>
            util.inspect(arg, {
              colors: enableColors,
              depth: null,
              maxArrayLength: null,
              showProxy: true,
              breakLength: -1,
              compact: false,
              sorted: true,
            })
          )
          .join(", ");

  fs.writeFileSync(file, `${colorizedTime} ${data}${os.EOL}`, { flag: "a" });
}

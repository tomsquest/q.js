import * as os from "os";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";
import callsites from "callsites";
import { time } from "./time";

const colors = {
  yellow: "\u001B[33m",
  reset: "\u001B[0m",
};

export function q(...args: unknown[]): void {
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    return;
  }

  const enableColors = !process.env.NO_COLOR;

  const colorizedTime = enableColors
    ? `${colors.yellow}${time()}${colors.reset}`
    : time();

  const destDir = process.env.TMPDIR || os.tmpdir();
  const destFile = path.join(destDir, "q");

  const callSite = callsites()[1];
  const callerFileLocation = getFileLocation(callSite);
  const callerCodeLocation = getCodeLocation(callSite);

  const data =
    args.length === 0
      ? "undefined"
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

  const header = `${colorizedTime} ${callerFileLocation} > ${callerCodeLocation}${os.EOL}`;
  const body = `${data}${os.EOL}`;
  fs.writeFileSync(destFile, `${header}${body}`, {
    flag: "a",
  });
}

const getFileLocation = (site: callsites.CallSite): string => {
  const fileName = site.getFileName();
  const lineNumber = site.getLineNumber();
  const columnNumber = site.getColumnNumber();

  let fileLocation = "";
  if (fileName) fileLocation = fileName;
  if (lineNumber) fileLocation += `:${lineNumber}`;
  if (columnNumber) fileLocation += `:${columnNumber}`;

  return fileLocation;
};

const getCodeLocation = (site: callsites.CallSite): string => {
  const typeName = site.getTypeName();
  const methodName = site.getMethodName() ?? site.getFunctionName();

  let codeLocation = "";
  if (typeName && methodName) codeLocation = `${typeName}.${methodName}()`;
  else if (methodName) codeLocation = `${methodName}()`;

  return codeLocation;
};

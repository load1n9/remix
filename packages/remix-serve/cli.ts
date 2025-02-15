import "./env";
import path from "path";
import os from "os";

import { createApp } from "./index";

let port = Number.parseInt(process.env.PORT || "3000", 10);
if (Number.isNaN(port)) {
  port = 3000;
}

const buildPathArg = process.argv[2];

if (!buildPathArg) {
  console.error(`
  Usage: remix-serve <build-dir>`);
  process.exit(1);
}

const buildPath = path.resolve(process.cwd(), buildPathArg);

const onListen = () => {
  const address =
    process.env.HOST ||
    Object.values(os.networkInterfaces())
      .flat()
      .find((ip) => ip?.family === "IPv4" && !ip.internal)?.address;

  if (!address) {
    console.log(`Remix App Server started at http://localhost:${port}`);
  } else {
    console.log(
      `Remix App Server started at http://localhost:${port} (http://${address}:${port})`
    );
  }
};

const app = createApp(buildPath);

if (process.env.HOST) {
  app.listen(port, process.env.HOST, onListen);
} else {
  app.listen(port, onListen);
}

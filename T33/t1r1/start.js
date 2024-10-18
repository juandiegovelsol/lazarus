const childProcess = require("child_process");

const backendProcess = childProcess.spawn(
  "npm run --prefix tech-store-backend start",
  { shell: true }
);
const frontendProcess = childProcess.spawn(
  "npm run --prefix tech-store-frontend start",
  { shell: true }
);

process.on("SIGINT", () => {
  backendProcess.kill();
  frontendProcess.kill();
  process.exit();
});

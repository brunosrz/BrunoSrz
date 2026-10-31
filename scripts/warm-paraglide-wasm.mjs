import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sdkEntry = fileURLToPath(import.meta.resolve("@lix-js/sdk"));
const wasmPath = resolve(dirname(sdkEntry), "wasm/lix_js_sdk_bg.wasm");

await readFile(wasmPath);

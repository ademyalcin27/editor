import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import {
  defaultConfig,
  parseYaml,
  stringifyYaml,
  validateConfig,
} from "../../../lib/yaml";

const CONFIG_PATH = path.join(process.cwd(), "config.yaml");
export const runtime = "nodejs";

export async function GET() {
  try {
    const file = await fs.readFile(CONFIG_PATH, "utf8");
    const config = parseYaml(file);
    return NextResponse.json(config);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      const yaml = stringifyYaml(defaultConfig);
      await fs.writeFile(CONFIG_PATH, yaml, "utf8");
      return NextResponse.json(defaultConfig);
    }

    return NextResponse.json(
      { error: "Failed to read configuration." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const config = validateConfig(body);
    const yaml = stringifyYaml(config);
    await fs.writeFile(CONFIG_PATH, yaml, "utf8");
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save configuration.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

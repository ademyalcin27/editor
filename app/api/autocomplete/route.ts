import { NextResponse } from "next/server";

const suggestions = [
  {
    label: "server",
    kind: "key",
    insertText: "server:",
    detail: "Top-level server block",
  },
  {
    label: "logging",
    kind: "key",
    insertText: "logging:",
    detail: "Top-level logging block",
  },
  {
    label: "debug",
    kind: "enum",
    insertText: "debug",
    detail: "Logging level",
  },
  {
    label: "info",
    kind: "enum",
    insertText: "info",
    detail: "Logging level",
  },
  {
    label: "warn",
    kind: "enum",
    insertText: "warn",
    detail: "Logging level",
  },
  {
    label: "error",
    kind: "enum",
    insertText: "error",
    detail: "Logging level",
  },
  {
    label: "true",
    kind: "boolean",
    insertText: "true",
    detail: "Boolean value",
  },
  {
    label: "false",
    kind: "boolean",
    insertText: "false",
    detail: "Boolean value",
  },
];

export async function GET() {
  return NextResponse.json({ items: suggestions });
}

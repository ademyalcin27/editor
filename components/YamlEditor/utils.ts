import { AutocompleteItem } from "./types";

const staticSuggestions: AutocompleteItem[] = [
  {
    label: "server",
    kind: "key",
    insertText: "server:",
    detail: "Top-level key",
    documentation: "Server configuration block.",
  },
  {
    label: "logging",
    kind: "key",
    insertText: "logging:",
    detail: "Top-level key",
    documentation: "Logging configuration block.",
  },
  {
    label: "host",
    kind: "key",
    insertText: "host:",
    detail: "Server host key",
  },
];

const triggerCharacters = [":", ..."abcdefghijklmnopqrstuvwxyz".split("")];

const mergeSuggestions = (
  staticSuggestions: AutocompleteItem[],
  suggestions: AutocompleteItem[]
) => {
  const seen = new Set<string>();
  const merged: AutocompleteItem[] = [];
  [...staticSuggestions, ...suggestions].forEach((item) => {
    const key = `${item.label}::${item.insertText}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(item);
    }
  });
  return merged;
};

export { staticSuggestions, triggerCharacters, mergeSuggestions };

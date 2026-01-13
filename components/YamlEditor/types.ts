export type AutocompleteItem = {
  label: string;
  kind: "key" | "enum" | "boolean" | "value" | "snippet";
  insertText: string;
  detail?: string;
  documentation?: string;
};

export type YamlEditorProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  suggestions?: AutocompleteItem[];
};

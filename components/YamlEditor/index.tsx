'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { AutocompleteItem, YamlEditorProps } from './types';

export default function YamlEditor({ value, onChange, error, suggestions = [] }: YamlEditorProps) {


  const handleMount: OnMount = (editor, monaco) => {
    monaco.languages.register({ id: 'yaml' });

    const disposable = monaco.languages.registerCompletionItemProvider('yaml', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const kindMap = {
          key: monaco.languages.CompletionItemKind.Property,
          enum: monaco.languages.CompletionItemKind.EnumMember,
          boolean: monaco.languages.CompletionItemKind.Keyword,
          value: monaco.languages.CompletionItemKind.Value,
          snippet: monaco.languages.CompletionItemKind.Snippet
        } satisfies Record<AutocompleteItem['kind'], monaco.languages.CompletionItemKind>;
      }
    });

    editor.onDidDispose(() => {
      disposable.dispose();
    });
  };

  return (
    <div>
      <Editor
        height="420px"
        defaultLanguage="yaml"
        value={value}
        onChange={(nextValue) => onChange(nextValue ?? '')}
        onMount={handleMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          quickSuggestions: { other: true, comments: false, strings: true },
          suggestOnTriggerCharacters: true
        }}
      />
      {error ? <div className="status error">{error}</div> : null}
    </div>
  );
}

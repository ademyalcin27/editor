'use client';

import { useEffect, useMemo, useState } from "react";
import { Config, defaultConfig, parseYaml, stringifyYaml } from "../lib/yaml";
import YamlEditor from "../components/YamlEditor";
import { AutocompleteItem } from "../components/YamlEditor/types";
import debounce from "lodash.debounce";
import ConfigForm from "../components/ConfigForm";

export default function HomePage() {
  const [yamlText, setYamlText] = useState<string>(stringifyYaml(defaultConfig));
  const [lastSource, setLastSource] = useState<'load' | 'yaml' | 'form'>('load');
  const [yamlError, setYamlError] = useState<string | null>(null);
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [suggestions, setSuggestions] = useState<AutocompleteItem[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/api/config');
        if (!response.ok) {
          throw new Error('Failed to load configuration.');
        }
        const data = (await response.json()) as Config;
        setLastSource('load');
        setConfig(data);
        setYamlText(stringifyYaml(data));
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Failed to load configuration.');
      }
    };

   const loadAutocomplete = async () => {
      try {
        const response = await fetch('/api/autocomplete');
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as { items: AutocompleteItem[] };
        setSuggestions(data.items ?? []);
      } catch {
        setSuggestions([]);
      }
    };

    loadConfig();
    loadAutocomplete();
  }, []);

  useEffect(() => {
    if (lastSource === 'yaml') {
      return;
    }
    setYamlText(stringifyYaml(config));
  }, [config, lastSource]);
  

  const debouncedSave = useMemo(
    () =>
      debounce(async (nextConfig: Config) => {
        try {
          const response = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nextConfig)
          });

          if (!response.ok) {
            const payload = await response.json().catch(() => ({}));
            throw new Error(payload?.error ?? 'Failed to save configuration.');
          }

          setSaveError(null);
        } catch (error) {
          setSaveError(error instanceof Error ? error.message : 'Failed to save configuration.');
        }
      }, 500),
    []
  );
 
  useEffect(() => {
    debouncedSave(config);
    return () => {
      debouncedSave.cancel();
    };
  }, [config, debouncedSave]);

  const handleYamlChange = (nextYaml: string) => {
    setLastSource('yaml');
    setYamlText(nextYaml);
    try {
      const parsed = parseYaml(nextYaml);
      setYamlError(null);
      setConfig(parsed);
    } catch (error) {
      setYamlError(error instanceof Error ? error.message : 'Invalid YAML.');
    }
  };

  return (
    <main>
      <header>
        <h1>YAML Config Studio</h1>
        <p>Edit the configuration with a live YAML editor and structured form.</p>
      </header>
       <div className="layout">
          <section className="panel">
            <h2>YAML Editor</h2>
            <YamlEditor value={yamlText} onChange={handleYamlChange} error={yamlError} suggestions={suggestions} />
            {saveError}
          </section>
          <section className="panel">
          <h2>Configuration Form</h2>
         <ConfigForm
            config={config}
            onChange={(nextConfig) => {
              setLastSource('form');
              setConfig(nextConfig);
            }}
          />
          {saveError ? <div className="status error">{saveError}</div> : <div className="status">Changes save after a short pause.</div>}
        </section>
        </div>
    </main>
  );
}
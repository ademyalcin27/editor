'use client';

import { useEffect, useState } from "react";
import { Config, defaultConfig, parseYaml, stringifyYaml } from "../lib/yaml";
import YamlEditor from "../components/YamlEditor";
import { AutocompleteItem } from "../components/YamlEditor/types";

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

        // fetch config from API
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Failed to load configuration.');
      }
    };

    const loadAutocomplete = async () => {
      try {
        // Fetch autocomplete suggestions from API
        setSuggestions([]);
      } catch {
        setSuggestions([]);
      }
    };

    loadConfig();
    loadAutocomplete();
  }, []);

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
          {lastSource}
          Configuration form component goes here
        </section>
        </div>
    </main>
  );
}
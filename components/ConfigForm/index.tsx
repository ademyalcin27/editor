'use client';

import type { Config, LoggingLevel } from '../../lib/yaml';

type ConfigFormProps = {
  config: Config;
  onChange: (nextConfig: Config) => void;
};

const levels: LoggingLevel[] = ['debug', 'info', 'warn', 'error'];

export default function ConfigForm({ config, onChange }: ConfigFormProps) {
  const updateServer = (patch: Partial<Config['server']>) => {
    onChange({
      ...config,
      server: {
        ...config.server,
        ...patch
      }
    });
  };

  const updateLogging = (patch: Partial<Config['logging']>) => {
    onChange({
      ...config,
      logging: {
        ...config.logging,
        ...patch
      }
    });
  };

  return (
    <form className="form-grid">
      <label>
        server.host
        <input
          type="text"
          value={config.server.host}
          onChange={(event) => updateServer({ host: event.target.value })}
        />
      </label>
      <label>
        server.port
        <input
          type="number"
          value={config.server.port}
          onChange={(event) => updateServer({ port: Number(event.target.value) })}
        />
      </label>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={config.server.use_ssl}
          onChange={(event) => updateServer({ use_ssl: event.target.checked })}
        />
        server.use_ssl
      </label>
      <label>
        logging.level
        <select
          value={config.logging.level}
          onChange={(event) => updateLogging({ level: event.target.value as LoggingLevel })}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </label>
      <label>
        logging.file
        <input
          type="text"
          value={config.logging.file}
          onChange={(event) => updateLogging({ file: event.target.value })}
        />
      </label>
    </form>
  );
}

import yaml from "js-yaml";

export type LoggingLevel = "debug" | "info" | "warn" | "error";
export type Config = {
  server: {
    host: string;
    port: number;
    use_ssl: boolean;
  };
  logging: {
    level: LoggingLevel;
    file: string;
  };
};

export const defaultConfig: Config = {
  server: {
    host: "127.0.0.1",
    port: 3000,
    use_ssl: true,
  },
  logging: {
    level: "debug",
    file: "./debug.log",
  },
};
const levelValues: LoggingLevel[] = ["debug", "info", "warn", "error"];

export const validateConfig = (value: unknown): Config => {
  if (typeof value !== "object" || value === null) {
    throw new Error("YAML must be a mapping object.");
  }

  const record = value as Record<string, unknown>;
  const server = record.server as Record<string, unknown> | undefined;
  const logging = record.logging as Record<string, unknown> | undefined;

  if (!server || typeof server !== "object") {
    throw new Error("Missing server configuration.");
  }

  if (!logging || typeof logging !== "object") {
    throw new Error("Missing logging configuration.");
  }

  if (typeof server.host !== "string") {
    throw new Error("server.host must be a string.");
  }

  if (typeof server.port !== "number" || Number.isNaN(server.port)) {
    throw new Error("server.port must be a number.");
  }

  if (typeof server.use_ssl !== "boolean") {
    throw new Error("server.use_ssl must be a boolean.");
  }

  if (typeof logging.file !== "string") {
    throw new Error("logging.file must be a string.");
  }

  if (
    typeof logging.level !== "string" ||
    !levelValues.includes(logging.level as LoggingLevel)
  ) {
    throw new Error("logging.level must be one of: debug, info, warn, error.");
  }

  return {
    server: {
      host: server.host,
      port: server.port,
      use_ssl: server.use_ssl,
    },
    logging: {
      level: logging.level as LoggingLevel,
      file: logging.file,
    },
  };
};

export const parseYaml = (text: string): Config => {
  const parsed = yaml.load(text);
  return validateConfig(parsed);
};

export const stringifyYaml = (config: Config): string => {
  return yaml.dump(config, {
    lineWidth: 0,
    noRefs: true,
  });
};

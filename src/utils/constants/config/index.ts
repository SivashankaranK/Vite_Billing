
interface IEnvConfig {
  baseUrl: string | undefined;
  versionPath: string | undefined;
  basePort: string | undefined;
}

export const envConfig: IEnvConfig = {
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  versionPath: import.meta.env.VITE_APP_VERSION_PATH,
  basePort: import.meta.env.VITE_APP_BASE_PORT
}
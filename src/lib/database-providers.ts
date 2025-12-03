export type DatabaseProvider = "neon" | "supabase";

export interface DatabaseProviderConfig {
  id: DatabaseProvider;
  name: string;
  description: string;
  logoPath: string;
  logoAlt: string;
  connectionStringUrl: string;
}

export const DATABASE_PROVIDERS: Record<
  DatabaseProvider,
  DatabaseProviderConfig
> = {
  neon: {
    id: "neon",
    name: "Neon",
    description: "Serverless Postgres",
    logoPath: "/neon-logomark-light-color.svg",
    logoAlt: "Neon",
    connectionStringUrl: "https://console.neon.tech/app/projects",
  },
  supabase: {
    id: "supabase",
    name: "Supabase",
    description: "Open-source ",
    logoPath: "/supabase-logo-icon.png",
    logoAlt: "Supabase",
    connectionStringUrl: "https://supabase.com/dashboard/project/_/settings/database",
  },
};

export const getProviderConfig = (
  provider: DatabaseProvider
): DatabaseProviderConfig => {
  return DATABASE_PROVIDERS[provider];
};

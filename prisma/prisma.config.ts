// Define the Config type locally since "prisma/config" does not export it
type Config = {
  seed: string;
};

const config: Config = {
  seed: "tsx prisma/seed.ts",
};

export default config;

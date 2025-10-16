import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Calorimeter',
  webDir: 'www',
  plugins: {
    Camera: {
      permissions: ['camera']
    }
  }
};

export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'starlings.capacitor.quasar.app',
  appName: 'starlings-hospitality',
  webDir: 'dist/spa',
  server: {
    androidScheme: 'https',
  },
};

export default config;

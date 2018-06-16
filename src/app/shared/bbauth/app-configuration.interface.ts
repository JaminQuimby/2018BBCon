export interface AppConfiguration {
  SkyApiSubscriptionKey?: string;
  SkyApiAppId?: string;
  AuthRedirectUri?: string;
  [index: string]: string;
}

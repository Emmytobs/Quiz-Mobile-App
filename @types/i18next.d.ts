import { resources } from "../assets/translations";

declare module "i18next" {
  interface CustomTypeOptions {
    // defaultNS: typeof defaultNS;
    resources: typeof resources["en"];
  }
}
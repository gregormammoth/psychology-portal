declare module 'i18next' {
  interface TFunction {
    (key: string, options?: any): string;
  }
}

declare module 'next-i18next' {
  export function useTranslation(namespace?: string): {
    t: (key: string, options?: any) => string;
    i18n: any;
  };
  
  export function serverSideTranslations(
    locale: string,
    namespaces: string[]
  ): Promise<any>;
} 
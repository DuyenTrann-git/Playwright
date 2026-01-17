
// protected readonly page: Page;

// constructor(page: Page) {
//   this.page = page;
// }
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) { }


  protected get<
    T extends Record<string, string | ((page: Page) => Locator)>
  >(
    locatorMap: T,
    locatorName: keyof T
  ): Locator {
    const locatorDef = locatorMap[locatorName];
    if (typeof locatorDef === 'function') {
      return locatorDef(this.page);
    }
    return this.page.locator(locatorDef);
  }


  // protected createLocatorGetter<
  //   T extends Record<string, string | ((page: Page) => Locator)>
  // >(
  //   locatorMap: T
  // ): (locatorName: keyof T) => Locator {
  //   return (locatorName: keyof T): Locator => {
  //     const locatorDef = locatorMap[locatorName];
  //     if (typeof locatorDef === 'function') {
  //       return locatorDef(this.page);
  //     }
  //     return this.page.locator(locatorDef);
  //   };
  // }


  protected createLocatorGetter<
  T extends Record<string, string | ((page: Page) => Locator)>
>(locatorMap: T) {
  return (locatorName: keyof T) => {
      const locatorDef = locatorMap[locatorName];
      if (typeof locatorDef === 'function') {
        return locatorDef(this.page);
      }
      return this.page.locator(locatorDef);
    };
  }


  protected async logFill(locator: Locator, value?: string) {
    const elementInfo = await this.getElementInfo(locator);
    const valueInfo = value !== undefined ? ` with value: ${value}` : '';
    console.log(`[Fill] ${elementInfo}${valueInfo}`);
  }

  protected async fillWithLog(
    locator: Locator,
    value: string,
    option?: { isSensitive?: boolean }
  ) {
    const masked = option?.isSensitive ? '****' : value;

    await this.logFill(locator, masked);
    await locator.fill(value);
  }

  private async getElementInfo(locator: Locator): Promise<string> {
    // Nếu locator không trỏ vào input/textarea/select hoặc chưa sẵn sàng => trả ''
    const currentValue = await locator.inputValue().catch(() => '');
    return currentValue;
  }

  abstract expectOnPage(): Promise<void>;
}

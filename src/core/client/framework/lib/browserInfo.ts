import Bowser from "bowser";

export interface BrowserInfo {
  version: number;
  ios: boolean;
  msie: boolean;
  mobile: boolean;
  tablet: boolean;
  supports: {
    cssVariables: boolean;
    fetch: boolean;
    proxyObject: boolean;
    intl: boolean;
    intlPluralRules: boolean;
    intersectionObserver: boolean;
  };
  macOS: boolean;
  iPadOS: boolean;
}

export function supportsCSSVars(window: Window): boolean {
  return (window as any).CSS && CSS.supports("color", "var(--fake-var)");
}

/**
 * Return browser information.
 * Call this before applying polyfills to get accurate
 * feature support results.
 */
export function getBrowserInfo(window: Window): BrowserInfo {
  const browser = Bowser.getParser(window.navigator.userAgent);
  const ios = browser.is(Bowser.OS_MAP.iOS);
  const macOS = browser.is(Bowser.OS_MAP.MacOS);
  const msie = browser.is(Bowser.BROWSER_MAP.ie);
  const mobile = browser.is(Bowser.PLATFORMS_MAP.mobile);
  const tablet = browser.is(Bowser.PLATFORMS_MAP.tablet);
  const version = Number.parseFloat(browser.getBrowserVersion());
  const browserInfo = {
    version,
    supports: {
      intl: typeof Intl !== "undefined",
      intlPluralRules: typeof Intl !== "undefined" && Boolean(Intl.PluralRules),
      proxyObject: Boolean((window as any).Proxy),
      cssVariables:
        (window as any).CSS && CSS.supports("color", "var(--fake-var)"),
      fetch: Boolean(window.fetch),
      intersectionObserver:
        "IntersectionObserver" in window &&
        "IntersectionObserverEntry" in window &&
        "intersectionRatio" in
          (window as any).IntersectionObserverEntry.prototype,
    },
    ios,
    msie,
    mobile,
    tablet,
    macOS,
    // TODO: (cvle) Wish there would be a better way to detecting lying iPadOS.
    iPadOS: macOS && window.navigator.maxTouchPoints > 1,
  };

  return browserInfo;
}

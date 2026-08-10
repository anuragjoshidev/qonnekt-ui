/**
 * Removes protocol (http://, https://, etc.) from a URL string
 * @param url - The URL string to process
 * @returns The URL without protocol
 */
export function removeProtocol(url: string): string {
  if (!url) return url;

  // Remove common protocols
  return url
    .replace(/^https?:\/\//i, "")
    .replace(/^ftp:\/\//i, "")
    .replace(/^file:\/\//i, "")
    .trim();
}

/**
 * Detects http/https scheme from a URL, or returns the fallback.
 */
export function detectProtocol(
  url: string | undefined | null,
  fallback = "https://",
): string {
  if (!url) return fallback;
  const match = url.trim().match(/^(https?):\/\//i);
  if (!match?.[1]) return fallback;
  return `${match[1].toLowerCase()}://`;
}

/**
 * Ensures a URL has an http(s) protocol, preserving an existing http/https scheme.
 * @param url - The URL string to process
 * @param fallbackProtocol - Protocol to use when none is present (default https://)
 * @returns The URL with a protocol, or the fallback protocol alone when empty
 */
export function ensureHttpsProtocol(
  url: string,
  fallbackProtocol = "https://",
): string {
  if (!url) return fallbackProtocol;
  const protocol = detectProtocol(url, fallbackProtocol);
  const cleaned = removeProtocol(url);
  return cleaned ? `${protocol}${cleaned}` : fallbackProtocol;
}

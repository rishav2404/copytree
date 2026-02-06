
/**
 * Processes a URL by:
 * 1. Replacing "/archive/" with "/tree/"
 * 2. Removing ".tar.gz" extension from the end
 */
export const transformUrl = (url: string): string => {
  if (!url) return '';
  
  let processed = url.trim();
  
  // Replace /archive/ with /tree/
  processed = processed.replace('/archive/', '/tree/');
  
  // Remove .tar.gz if it exists at the end
  const extension = '.tar.gz';
  if (processed.toLowerCase().endsWith(extension)) {
    processed = processed.slice(0, -extension.length);
  }
  
  return processed;
};

/**
 * Basic URL validation
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

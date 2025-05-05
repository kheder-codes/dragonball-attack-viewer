// src/utils/slugify.ts

/**
 * Converts a string into a URL-friendly "slug".
 * Handles basic cases like spaces, special characters, and case normalization.
 * Example: "Majin Vegeta" -> "majin-vegeta"
 * Example: "Kaiōken (x4)" -> "kaioken-x4"
 *
 * @param text The text to slugify.
 * @returns The slugified string, or an empty string if input is invalid.
 */
export const slugify = (text: string): string => {
    // Handle null, undefined, or empty strings gracefully
    if (!text) return '';
  
    return text
      .toString() // Ensure it's a string
      .normalize('NFD') // Decompose accented characters (e.g., 'é' -> 'e' + '´')
      .replace(/[\u0300-\u036f]/g, '') // Remove the combining diacritical marks
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading/trailing whitespace
      .replace(/[^\w\s-]/g, '') // Remove all non-word characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, '') // Trim hyphens from the start
      .replace(/-+$/, ''); // Trim hyphens from the end
  };
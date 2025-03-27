/**
 * Copies text to clipboard and returns a promise
 * @param text Text to copy to clipboard
 * @returns Promise that resolves when text is copied
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to copy text:', error);
    // Fallback method
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const success = document.execCommand('copy');
      if (!success) {
        return Promise.reject(new Error('Failed to copy text'));
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      return Promise.reject(err);
    } finally {
      document.body.removeChild(textArea);
    }
  }
} 
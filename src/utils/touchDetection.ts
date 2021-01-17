export default function isTouchDevice() {
  if (window && 'ontouchstart' in window) {
    return true;
  }
  return false;
}

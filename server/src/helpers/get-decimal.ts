export function toFixed(rawToken: number, decimals = 0) {
  const fixed = Math.pow(10, decimals)
  return Math.floor(rawToken * fixed) / fixed
}

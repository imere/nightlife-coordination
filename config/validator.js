export function validateUsername (val) {
  return /^[a-zA-Z]{1}[0-9a-zA-Z]{4,9}$/.test(val)
}

export function validatePassword (val) {
  return /^[0-9a-zA-Z]{5,15}$/.test(val)
}

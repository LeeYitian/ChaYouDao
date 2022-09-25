export function currency(num) {
  const n = parseInt(num, 10)
  return `${n
    .toFixed(0)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0
        ? `, ${c}`.replace(/\s/g, '')
        : c
    )}`
}

export function date(time) {
  const localDate = new Date(time * 1000)
  const year = localDate.getFullYear()
  const month = ('0' + (localDate.getMonth() + 1)).slice(-2)
  const day = ('0' + localDate.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}

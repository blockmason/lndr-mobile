export const shortTimePeriod = 250
export const mediumTimePeriod = 1000
export const longTimePeriod = 2500

export const delay = time => new Promise(
  resolve => setTimeout(resolve, time)
)

export const debounce = (action: (any?) => void, interval: number=shortTimePeriod) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => action(...args), interval)
  }
}

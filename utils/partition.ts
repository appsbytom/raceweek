const partition = <T>(array: T[], predicate: (item: T) => boolean) => {
  const pass: T[] = [], fail: T[] = []
  for (const item of array) {
    (predicate(item) ? pass : fail).push(item)
  }
  return [pass, fail]
}

export default partition
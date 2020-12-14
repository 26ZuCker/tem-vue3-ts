function curry(fn: Function[]) {
  if (fn.length <= 1) {
    return fn;
  }
  const generator = (...rest) =>
    fn.length === rest.length ? fn(...rest) : (...newRest) => generator(...rest, ...newRest);
  return generator;
}

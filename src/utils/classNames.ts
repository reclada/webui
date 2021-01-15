function fromNestedObject(css: Record<string, boolean>) {
  return Object.entries(css)
    .filter(([, include]) => include)
    .map(([clazz]) => clazz)
    .join(' ');
}

export function classNames(...classes: (string | Record<string, boolean> | undefined)[]) {
  return classes
    .map(arg => {
      switch (typeof arg) {
        case 'string':
          return arg;
        case 'object':
          return fromNestedObject(arg);
        default:
          return '';
      }
    })
    .filter(value => value)
    .join(' ');
}

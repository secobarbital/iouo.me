export function makePreventDefaultDriver () {
  return function preventDefaultDriver (prevented$) {
    prevented$
      .subscribe(e => e.preventDefault())
    return prevented$
  }
}

interface data {
  name: string
  foo: number
  bar: number
  baz: number
  bob: number
  far: number
  faz: number
  fop: number
  coo: number
  cor: number
  cop: number
  another: number
  yet_another: number
}

const randomNumber = () => Math.floor(Math.random() * 10);

const row = (name: string): data => {
  return {
    name,
    bar: randomNumber(),
    baz: randomNumber(),
    bob: randomNumber(),
    coo: randomNumber(),
    cop: randomNumber(),
    cor: randomNumber(),
    far: randomNumber(),
    faz: randomNumber(),
    foo: randomNumber(),
    fop: randomNumber(),
    another: randomNumber(),
    yet_another: randomNumber()
  }
};

export const createRow = (name: string) => row(name);
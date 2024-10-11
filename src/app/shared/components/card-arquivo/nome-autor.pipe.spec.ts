import { NomeAutorPipe } from './pipes/nome-autor.pipe';

describe('NomeAutorPipe', () => {
  it('create an instance', () => {
    const pipe = new NomeAutorPipe();
    expect(pipe).toBeTruthy();
  });
});

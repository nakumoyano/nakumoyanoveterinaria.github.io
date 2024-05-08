import { BooleanColorPipe } from './boolean-color.pipe';

describe('BooleanColorPipe', () => {
  it('create an instance', () => {
    const pipe = new BooleanColorPipe();
    expect(pipe).toBeTruthy();
  });
});

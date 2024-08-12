import { Data } from 'effect';

export abstract class DomainError extends Data.Error {
  abstract readonly _tag: string;
  abstract readonly message: string;

  public toPrimitives(): {
    type: string;
    description: string;
    data: Record<string, unknown>;
  } {
    const props = Object.entries(this).filter(
      ([key, _]) => key !== '_tag' && key !== 'message',
    );

    return {
      type: this._tag,
      description: this.message,
      data: props.reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value,
        }),
        {},
      ),
    };
  }
}

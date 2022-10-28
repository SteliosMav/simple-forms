export type Validator<V> = (value: V) => string | undefined;

interface Validators {
  minLength: (length: number) => Validator<string>;
  email: Validator<string>;
}

export const validators: Validators = {
  minLength(minLength: number): Validator<string> {
    return (value: string): string | undefined =>
      value.length < minLength
        ? `Minimum character length should be ${minLength}.`
        : undefined;
  },
  email(email: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return undefined;
    } else {
      return "Must be valid email.";
    }
  },
};

type Mapping<
  N extends number[],
  Acc extends string[] = []
> = N["length"] extends Acc["length"]
  ? Acc
  : Mapping<N, [...Acc, `${N[Acc["length"]]}`]>;

export type FormActionSubmitType<T extends string[]> = {
  errors: Partial<Record<T[number], string[] | undefined | void>>;
};

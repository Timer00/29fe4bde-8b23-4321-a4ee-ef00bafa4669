import { keywords } from "@/config/generator";

export type KeywordsGen<T, G> = Record<keyof T, Record<string, G>>;

export type Params = {
  [key in keyof typeof keywords]: string;
}

interface Combination {
  params: Params;
}

export function generatePaths(kws: typeof keywords): Combination[] {
  function combine(index: number, currentCombo: Params) {
    if (index === keys.length) {
      result.push({ params: { ...currentCombo } });
      return;
    }

    const key = keys[index] as keyof typeof kws;
    const options = kws[key];

    for (const option in options) {
      combine(index + 1, { ...currentCombo, [key]: option });
    }
  }

  const keys = Object.keys(kws); 
  const result: Combination[] = [];
  
  combine(0, {} as Params);

  return result;
}

export type Data = {
  [key in keyof Params]: {
    key: string;
    value: string;
    metadata?: typeof keywords[key][string];
  }
};

// @TODO: Memoized hook
export const getData = (params: Params): Data => {
  return Object.keys(params).reduce((acc, key) => {
    const k = key as keyof Params;
    const v = params[k];
    const metadata = keywords[k][v];
    
    const val: Data[keyof Params] = {
      key,
      value: v,
      metadata
    }

    return {
      ...acc,
      [k]: val
    }
  }, {} as Data);
}

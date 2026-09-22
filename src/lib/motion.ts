export const ease = [0.22, 1, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export type Segment = { text: string; serif?: boolean; muted?: boolean };
export type Line = Segment[];

/**
 * Piecewise-linear mapping as a plain function. Passing a function to
 * useTransform keeps a scroll-linked value on the JS path, which stays correct
 * when the scroll container's geometry changes after hydration.
 */
export function ramp(input: number[], output: number[]) {
  return (v: number) => {
    if (v <= input[0]) return output[0];
    for (let i = 1; i < input.length; i++) {
      if (v <= input[i]) {
        const t = (v - input[i - 1]) / (input[i] - input[i - 1]);
        return output[i - 1] + t * (output[i] - output[i - 1]);
      }
    }
    return output[output.length - 1];
  };
}

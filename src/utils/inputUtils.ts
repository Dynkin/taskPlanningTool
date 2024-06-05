export const defaultSelectFilterOption = (
  input: string,
  option?: { label: string; value: number | string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

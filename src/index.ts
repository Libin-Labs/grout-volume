function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function dimension(value: number): void {
  finite(value, 1e-6, 1e6);
}
export function groutVolume(
  columns: number,
  rows: number,
  tileWidth: number,
  tileHeight: number,
  jointWidth: number,
  depth: number,
): { jointArea: number; volume: number; fieldWidth: number; fieldHeight: number } {
  integer(columns, 1, 1e6);
  integer(rows, 1, 1e6);
  for (const v of [tileWidth, tileHeight, depth]) dimension(v);
  finite(jointWidth, 0, 1e6);
  const vertical = (columns - 1) * jointWidth,
    horizontal = (rows - 1) * jointWidth,
    jointArea =
      vertical * rows * tileHeight + horizontal * columns * tileWidth + vertical * horizontal,
    volume = jointArea * depth;
  if (!Number.isFinite(volume)) throw new RangeError('Volume overflow');
  return {
    jointArea,
    volume,
    fieldWidth: columns * tileWidth + vertical,
    fieldHeight: rows * tileHeight + horizontal,
  };
}

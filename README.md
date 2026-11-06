# @lp-labs/grout-volume

Internal rectangular tile-joint volume without subtractive cancellation.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/grout-volume
```

## Working example

```js
import { groutVolume } from '@lp-labs/grout-volume';
if (Math.abs(groutVolume(2, 2, 1, 1, 0.1, 1).jointArea - 0.41) > 1e-12) throw new Error('Joints');
```

CommonJS: `const api = require('@lp-labs/grout-volume')`.

## Behavior, customization and limits

These are material/geometry estimates only,not building-code compliance,structural engineering,installation or safety instructions. Caller supplies compatible units and measured dimensions; procurement and real cuts can differ. groutVolume(columns,rows,tileWidth,tileHeight,jointWidth,depth) returns internal jointArea,volume,fieldWidth,fieldHeight. Count integers1..1e6; tile lengths/depth[1e-6,1e6],joint[0,1e6],same unit. Explicitly expands vertical/horizontal/crossing joint terms,no outer perimeter joint. Does not model beveled tile,porosity,density,material mixes or installation requirements. O(1),nonfinite results throw.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function groutVolume(
  columns: number,
  rows: number,
  tileWidth: number,
  tileHeight: number,
  jointWidth: number,
  depth: number,
): {
  jointArea: number;
  volume: number;
  fieldWidth: number;
  fieldHeight: number;
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.

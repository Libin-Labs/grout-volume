import { groutVolume } from '@lp-labs/grout-volume';
if (Math.abs(groutVolume(2, 2, 1, 1, 0.1, 1).jointArea - 0.41) > 1e-12) throw new Error('Joints');
// @ts-expect-error invalid argument must be rejected by declarations
groutVolume('2', 2, 1, 1, 0.1, 1);

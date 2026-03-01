import { Suspense } from 'react';
import PreviewScheduleTravel from '../../../../../src/app/user/travels/schedule/preview';

export default function Preview() {
  return (
    <Suspense fallback={null}>
      <PreviewScheduleTravel />
    </Suspense>
  );
}

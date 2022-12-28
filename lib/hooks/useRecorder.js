import { useCallback, useEffect, useRef, useState } from 'react';
import dispatchRecording from '../utils/dispatchRecording';

export default function useRecorder() {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const effectRan = useRef(false);

  const recordEventHandler = useCallback(({ action, event }) => {
    dispatchRecording(
      {
        action,
        target: event.target,
        pageX: event.pageX,
        pageY: event.pageY,
        value: event.target.value,
      },
      setRecordings
    );
  }, []);

  const clickEventListener = useCallback(
    (event) => recordEventHandler({ action: 'click', event }),
    [recordEventHandler]
  );
  const mousemoveEventListener = useCallback(
    (event) => recordEventHandler({ action: 'mousemove', event }),
    [recordEventHandler]
  );
  const keyupEventListener = useCallback(
    (event) => recordEventHandler({ action: 'keyup', event }),
    [recordEventHandler]
  );

  const recorderElementRef = useRef();
  useEffect(() => {
    const element = recorderElementRef.current;
    if (!isRecording) {
      element.removeEventListener('click', clickEventListener);
      element.removeEventListener('mousemove', mousemoveEventListener);
      element.removeEventListener('keyup', keyupEventListener);
      effectRan.current === false;
    }
    if (
      recorderElementRef.current &&
      effectRan.current === false &&
      isRecording
    ) {
      element.addEventListener('click', clickEventListener);
      element.addEventListener('mousemove', mousemoveEventListener);
      element.addEventListener('keyup', keyupEventListener);
    }
  }, [recorderElementRef.current, isRecording]);

  return { recordings, recorderElementRef, isRecording, setIsRecording };
}

// switch (action) {
//   case 'click':

//     break;
//   case 'mousemove':
//     dispatchRecording(
//       {
//         action,
//         pageX: event.pageX,
//         pageY: event.pageY,
//       },
//       setRecordings,
//     );
//     break;
//   case 'keyup':
//     dispatchRecording(
//       {
//         action,
//         target: event.target,
//         pageX: event.pageX,
//         pageY: event.pageY,
//         value: event.target.value,
//       },
//       setRecordings,
//     );
//     break;
//   default:
//     break;
// }

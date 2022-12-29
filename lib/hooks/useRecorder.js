/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';
import dispatchRecording from '../utils/dispatchRecording';

export default function useRecorder() {
  const [recordings, setRecordings] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [recorderStartTime, setRecorderStartTime] = useState(null);
  const [recorderEndTime, setRecorderEndTime] = useState(null);

  const effectRan = useRef(false);

  const recordEventHandler = useCallback(
    ({ action, event }) => {
      console.log('both', recorderStartTime, event.timeStamp);
      dispatchRecording(
        {
          action,
          target: event.target,
          pageX: event.pageX,
          pageY: event.pageY,
          value: event.target.value,
          timeStamp: event.timeStamp,
          timeElapsedFromStartTime: Math.floor(
            event.timeStamp - recorderStartTime
          ),
        },
        setRecordings
      );
    },
    [recorderStartTime]
  );

  const clickEventListener = useCallback(
    (event) => recordEventHandler({ action: 'click', event }),
    [recordEventHandler]
  );
  const mousemoveEventListener = useCallback(
    (event) => recordEventHandler({ action: 'mousemove', event }),
    [recordEventHandler]
  );

  const pointerupEventListener = useCallback(
    (event) => recordEventHandler({ action: 'pointerup', event }),
    [recordEventHandler]
  );

  const pointerdownEventListener = useCallback(
    (event) => recordEventHandler({ action: 'pointerdown', event }),
    [recordEventHandler]
  );

  const keyupEventListener = useCallback(
    (event) => recordEventHandler({ action: 'keyup', event }),
    [recordEventHandler]
  );

  const onRecordingStart = (event) => {
    if (!recorderStartTime) {
      setRecorderStartTime(event.timeStamp);
    }
    setIsRecording(true);
  };

  const onRecordingStop = (event) => {
    setRecorderEndTime(event.timeStamp);
    setIsRecording(false);
  };

  const recorderElementRef = useRef();

  useEffect(() => {
    const element = recorderElementRef.current;
    if (!isRecording) {
      element.removeEventListener('click', clickEventListener);
      element.removeEventListener('mousemove', mousemoveEventListener);
      element.removeEventListener('keyup', keyupEventListener);
      element.removeEventListener('pointerup', pointerupEventListener);
      // element.removeEventListener('pointerdown', pointerdownEventListener);
      effectRan.current === false;
      recorderStartTime && setIsPlayerVisible(true);
    }
    if (
      recorderElementRef.current &&
      effectRan.current === false &&
      isRecording
    ) {
      element.addEventListener('click', clickEventListener);
      element.addEventListener('mousemove', mousemoveEventListener);
      element.addEventListener('keyup', keyupEventListener);
      element.addEventListener('pointerup', pointerupEventListener);
      // element.addEventListener('pointerdown', pointerdownEventListener);

      setIsPlayerVisible(false);
    }
  }, [recorderElementRef.current, isRecording]);

  return {
    recordings,
    recorderElementRef,
    isRecording,
    setIsRecording,
    isPlaying,
    setIsPlaying,
    isPlayerVisible,
    onRecordingStart,
    onRecordingStop,
  };
}

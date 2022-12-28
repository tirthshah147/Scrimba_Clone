import { defaultEventRecorderTemplate } from '../../constants/constants';
import getElementSelector from './getElementSelector';

export default function dispatchRecording(recordingObject, setRecordings) {
  console.log(recordingObject);
  const currentEventRecorderData = { ...defaultEventRecorderTemplate };
  currentEventRecorderData.type = recordingObject.action;
  currentEventRecorderData.selector = getElementSelector(
    recordingObject.target,
  );
  currentEventRecorderData.offsetX = recordingObject.pageX;
  currentEventRecorderData.offsetY = recordingObject.pageY;
  currentEventRecorderData.data = recordingObject.value;

  setRecordings((prevRecordings) => [
    ...prevRecordings,
    currentEventRecorderData,
  ]);
}

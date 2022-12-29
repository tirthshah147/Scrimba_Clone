export default function makeThisEventHappen(event, cursorRef) {
  console.log(event);
  switch (event.type) {
    case 'mousemove':
      cursorRef.current.style.top = `${event.offsetY}px`;
      cursorRef.current.style.left = `${event.offsetX}px`;
      break;
    case 'click':
      cursorRef.current.style.top = `${event.offsetY}px`;
      cursorRef.current.style.left = `${event.offsetX}px`;
      document.elementFromPoint(event.offsetX, event.offsetY).click();
      // document.querySelector(event.selector).click();
      break;
    case 'keyup':
      cursorRef.current.style.top = `${event.offsetY}px`;
      cursorRef.current.style.left = `${event.offsetX}px`;
      document.querySelector(event.selector).focus();
      document.querySelector(event.selector).value = event.data;
      break;
    default:
      break;
  }
}

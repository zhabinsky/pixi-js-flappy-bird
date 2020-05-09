const cbs = [];

let hasRemovedDuplicateListener = false;

function click (event) {
  if (!hasRemovedDuplicateListener) {
    if (event.type === 'click')
      window.removeEventListener ('touchstart', click);
    else window.removeEventListener ('click', click);
    hasRemovedDuplicateListener = true;
  }

  for (let i = 0; i < cbs.length; i++)
    cbs[i] (event);
}

// we will listen to both click and touchstar
// to cover touch devices and desktop
// later one of them will be removed
window.addEventListener ('click', click);
window.addEventListener ('touchstart', click);

export default cb => cbs.push (cb);

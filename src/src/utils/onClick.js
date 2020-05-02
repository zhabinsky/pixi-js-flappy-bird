const cbs = [];

let hasRemovedRedundant = false;

function click (event) {
  if (!hasRemovedRedundant) {
    if (event.type === 'click')
      window.removeEventListener ('touchstart', click);
    else window.removeEventListener ('click', click);
    hasRemovedRedundant = true;
  }

  for (let i = 0; i < cbs.length; i++) {
    const cb = cbs[i];
    cb (event);
  }
}

window.addEventListener ('click', click);
window.addEventListener ('touchstart', click);

export default cb => {
  cbs.push (cb);
};

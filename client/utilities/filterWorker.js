const workercode = () => {
  // eslint-disable-next-line
  self.onmessage = e => {
    // without self, onmessage is not defined
    const searchWithinArray = (arr, target) => {
      const cleanTarget = target ? target.trim().toLowerCase() : '';
      if (!cleanTarget) return arr;
      return arr.filter(item => item.name.toLowerCase().includes(cleanTarget));
    };
    const workerResult = searchWithinArray(e.data.array, e.data.target);
    // eslint-disable-next-line
    self.postMessage({ result: workerResult }); // here it's working without self
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

// eslint-disable-next-line
const blob = new Blob([code], { type: 'application/javascript' });
const workerScript = URL.createObjectURL(blob);

export default workerScript;

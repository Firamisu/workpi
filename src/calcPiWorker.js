import pi from "./utils/pi"

self.onmessage = function (n) {
    const result = pi.get(n.data)


    self.postMessage(result);
};


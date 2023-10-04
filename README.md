# N64 Controller Web Control

This repository contains examples of how to interface the N64 controller on the web using p5.js and a dedicated worker. Examples will be posted in the `examples` folder as they are created.

## How to use:

To build the JavaScript version to `dist`, run the following commands:

```
npm ci
npx tsc
```

Note that this code relies on the [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API), and therefore will only work in Chromium-based browser environments.

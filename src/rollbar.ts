/**
Error reporting service.
https://docs.rollbar.com/docs/react
*/

import Rollbar from "rollbar";

// config docs:
// https://docs.rollbar.com/docs/rollbarjs-configuration-reference

export const rollbar = new Rollbar({
  accessToken: "337a638ee9714c4c86ff50d97ce080db",
  environment: import.meta.env.MODE,
  // must include `payload` prop, else calling `<RollbarContext context="...">` throws: Cannot read properties of undefined (reading 'context') https://github.com/rollbar/rollbar-react/issues/102#issuecomment-2664985713
  payload: {},
  captureUncaught: true,
  captureUnhandledRejections: true,
  nodeSourceMaps: true,
  scrubFields: [
    // scrub Guest name
    "first_name",
    "last_name",
  ],

  // TODO: want these?
  // itemsPerMinute: 60,
  // maxItems: 0,
  // addErrorContext: false,
  // autoInstrument: { network: true, dom: true },
  // captureIp: true,
  // captureEmail: true,
  // captureLambdaTimeouts: true,
  // checkIgnore: () => false,
  // ignoredMessages: [
  //   "Exception message to ignore",
  //   /Cannot read properties of undefined/i,
  // ],
  // logLevel: "debug",
  // maxRetries: undefined,
  // maxTelemetryEvents: 100,
  // overwriteScrubFields: false,
  // reportLevel: "debug",
  // retryInterval: null,
  // scrubTelemetryInputs: false,
  // stackTraceLimit: undefined,
  // timeout: undefined,
});

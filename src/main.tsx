import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import * as auth from "./lib/api/auth";

import {
  ErrorBoundary as RollbarErrorBoundary,
  Provider as RollbarProvider,
} from "@rollbar/react";
import { rollbar } from "./rollbar";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

auth.configure();

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <RollbarProvider instance={rollbar}>
      {/*
        TODO: additional error boundary config?
        https://docs.rollbar.com/docs/react#pass-props-to-control-behavior
        Fallback UI?
      */}
      <RollbarErrorBoundary errorMessage="Error in React render:">
        <RouterProvider router={router} />
      </RollbarErrorBoundary>
    </RollbarProvider>,
  );
}

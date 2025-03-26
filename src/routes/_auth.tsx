import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuthStore, useServiceTypesStore } from "../lib/utils";
import App from "../App";
import { RollbarContext } from "@rollbar/react";

export const Route = createFileRoute("/_auth")({
  component: () => {
    return (
      <RollbarContext context="/_auth">
        <App />
      </RollbarContext>
    );
  },
  beforeLoad: async (): Promise<AppContext> => {
    const { authUser } = useAuthStore.getState();

    if (!authUser) throw redirect({ to: "/" });

    const authUserIsAdmin = authUser?.role === "admin";

    const { serviceTypes: _serviceTypes, refreshServices } =
      useServiceTypesStore.getState();

    if (!_serviceTypes.length) await refreshServices();

    const { serviceTypes } = useServiceTypesStore.getState();

    return {
      serviceTypes,
      authUser,
      authUserIsAdmin,
      refreshServices,
    };
  },
  loader: ({ context }): AppContext => context,
});

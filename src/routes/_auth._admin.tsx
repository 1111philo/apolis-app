import { RollbarContext } from "@rollbar/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_admin")({
  component: () => {
    return (
      <RollbarContext context="_auth/_admin">
        <RouteComponent />
      </RollbarContext>
    );
  },
  beforeLoad: ({ context }): AppContext => {
    const { authUserIsAdmin } = context;
    if (!authUserIsAdmin) {
      throw redirect({ to: ".." });
    }
    return context;
  },
});

function RouteComponent() {
  return <Outlet />;
}

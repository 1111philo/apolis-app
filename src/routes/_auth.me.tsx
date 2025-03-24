import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUserById } from "../lib/api";
import { UserProfile } from "../lib/components";
import { RollbarContext } from "@rollbar/react";

export const Route = createFileRoute("/_auth/me")({
  component: () => {
    return (
      <RollbarContext context="/me">
        <MyAccount />
      </RollbarContext>
    );
  },
  loader: async ({ context }) => {
    // user can only see their own account
    const { user_id } = context.authUser!;
    const user = await getUserById(user_id);
    if (!user) throw redirect({ to: "/users", replace: true });
    return { user };
  },
});

function MyAccount() {
  const { user } = Route.useLoaderData();
  return <UserProfile user={user!} isOwnAccount={true} />;
}

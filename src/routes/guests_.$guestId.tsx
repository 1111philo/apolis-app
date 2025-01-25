import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guests_/$guestId")({
  component: GuestProfileView,
});

function GuestProfileView() {
  return (
    <>
      {/*
      Title: Guest ID
      Form
        First name field
        Last name field
        Birthday field
        Case Manager field
      Button: Save Changes

      Table: Active Notifications
        fields:
      Table: Archived Notifications
        fields:
      Table: Past Visits
        fields:
    */}
      <h1>Guest Profile</h1>
    </>
  );
}

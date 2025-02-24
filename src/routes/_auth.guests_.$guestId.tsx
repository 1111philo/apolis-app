import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "react-bootstrap";
import {
  FeedbackMessage,
  GuestProfileForm,
  Notifications,
  Services,
} from "../lib/components";
import { deleteGuest, getGuestData } from "../lib/api";
import { paddedId, sortByTimeDescending } from "../lib/utils";

interface LoaderData {
  guest: Guest;
  notifications: {
    active: GuestNotification[];
    archived: GuestNotification[];
  };
  services: {
    slotted: GuestService[];
    queued: GuestService[];
    completed: GuestService[];
  };
}

export const Route = createFileRoute("/_auth/guests_/$guestId")({
  component: GuestProfileView,
  parseParams: (params): { guestId: number } => ({
    guestId: parseInt(params.guestId),
  }),
  loader: async ({ context, params }): Promise<LoaderData> => {
    const { serviceTypes } = context;
    const { guestId } = params;
    const guestResponse = await getGuestData(guestId);
    const { total, ...guest } = guestResponse;
    let { guest_services, guest_notifications } = guest;

    // mix in names from service types, filtering out those tied to services
    // that no longer exist (in theory, this filtering should not be needed
    // as a service type deletion should cascade to all guest services, but
    // this is currently not the case)
    const servicesWithNames: GuestService[] = guest_services
      .map((s) => {
        let { name: service_name } = serviceTypes!.find(
          (t) => t.service_id === s.service_id
        ) ?? { name: null };
        if (!service_name) return null;
        return { ...s, service_name };
      })
      .filter((s) => s);

    const services = {
      slotted: servicesWithNames.filter((s) => s.status === "Slotted"),
      queued: servicesWithNames.filter((s) => s.status === "Queued"),
      completed: servicesWithNames.filter((s) => s.status === "Completed"),
    };

    guest_notifications = sortByTimeDescending(
      guest_notifications,
      "created_at"
    ) as GuestNotification[];

    const notifications = {
      active: guest_notifications.filter((n) => n.status === "Active"),
      archived: guest_notifications.filter((n) => n.status === "Archived"),
    };

    return { guest, services, notifications };
  },
});

// TODO: eventually revive the visits table
export default function GuestProfileView() {
  const {
    guest,
    services,
    notifications: _notifications,
  } = Route.useLoaderData();

  const [notifications, setNotifications] = useState(_notifications);

  // TODO: swap out this hack for a real solution
  // DIRTY HACK: update notifications list after new notif created,
  // without doing a full page refresh (without this, needs a refresh to update)
  // POTENTIAL FIX: use tanstack query like Service Detail view
  useEffect(() => {
    setNotifications(_notifications);
  }, [_notifications]);

  const navigate = useNavigate();

  const [feedback, setFeedback] = useState<UserMessage>({
    text: "",
    isError: false,
  });

  const guestId = paddedId(guest.guest_id);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Guest Profile</h1>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={async () => await deleteGuestRecord(guest.guest_id)}
        >
          Delete Guest Record
        </Button>
      </div>

      <h4>ID: {guestId}</h4>

      <FeedbackMessage message={feedback} />

      <GuestProfileForm guest={guest} setViewFeedback={setFeedback} />

      <h2 className="mb-3">Active Notifications</h2>
      <Notifications
        notifications={notifications.active}
        onToggleStatus={onToggleNotificationStatus}
      />

      <h2 className="mb-3">Archived Notifications</h2>
      <Notifications
        notifications={notifications.archived}
        onToggleStatus={onToggleNotificationStatus}
      />

      <h2 className="mb-3">Slotted Services</h2>
      <Services services={services.slotted} status="Slotted" />

      <h2 className="mb-3">Queued Services</h2>
      <Services services={services.queued} status="Queued" />

      <h2 className="mb-3">Completed Services</h2>
      <Services services={services.completed} status="Completed" />
    </>
  );

  async function deleteGuestRecord(guestId) {
    if (
      !confirm(
        `Are you sure you want to delete this guest?
        ${guest.first_name} ${guest.last_name}, born ${guest.dob}`
      )
    ) {
      return;
    }
    const success = await deleteGuest(guestId);
    if (!success) {
      setFeedback({
        text: `Oops! The guest record couldn't be deleted. Try again in a few.`,
        isError: true,
      });
      return;
    }
    navigate({ to: "/guests", replace: true });
  }

  function onToggleNotificationStatus(
    success: boolean,
    notificationId: number,
    initialStatus: GuestNotificationStatus
  ) {
    if (!success) return;
    // move the item to the other notifications array
    // (if we want to move to the TOP of the other array, remove both sort func calls,
    // keeping only the [moved, ...notifications.XXX])
    let active: GuestNotification[];
    let archived: GuestNotification[];
    let moved: GuestNotification;
    if (initialStatus === "Active") {
      active = notifications.active.filter(
        (n) => n.notification_id !== notificationId
      );
      moved = {
        ...notifications.active.find(
          (n) => n.notification_id === notificationId
        )!,
        status: "Archived",
      };
      archived = sortByTimeDescending(
        [moved, ...notifications.archived],
        "created_at"
      ) as GuestNotification[];
    } else {
      archived = notifications.archived.filter(
        (n) => n.notification_id !== notificationId
      );
      moved = {
        ...notifications.archived.find(
          (n) => n.notification_id === notificationId
        )!,
        status: "Active",
      };
      active = sortByTimeDescending(
        [moved, ...notifications.active],
        "created_at"
      ) as GuestNotification[];
    }
    setNotifications({ active, archived });
  }
}

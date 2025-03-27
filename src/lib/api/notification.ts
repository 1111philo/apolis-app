/** Notification-related API calls  */

import * as API from "aws-amplify/api";
import { reportApiError } from "./";

export async function toggleGuestNotificationStatus(
  notification_id: number,
): Promise<boolean> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/toggleGuestNotificationStatus",
      options: { body: { notification_id } },
    }).response;
    const { success } = (await response.body.json()) as any as SuccessResponse;
    return success;
  } catch (err) {
    const msg = `Couldn't toggle notification status for notification with id: ${notification_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return false;
  }
}

export async function addGuestNotification(
  n: Partial<GuestNotification>,
): Promise<GuestNotification | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/addGuestNotification",
      options: { body: { ...n, status: "Active" } },
    }).response;
    const { notification } =
      (await response.body.json()) as any as AddGuestNotificationAPIResponse;
    return notification;
  } catch (err) {
    const msg = `Couldn't add the notification for guest with id: ${n.guest_id}`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function getGuestNotifications(
  guest_id: number,
): Promise<GuestNotificationsAPIResponse | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getGuestNotifications",
      options: { body: { guest_id } },
    }).response;
    return (await response.body.json()) as any as GuestNotificationsAPIResponse;
  } catch (err) {
    const msg = `Couldn't get notifications for guest with id: ${guest_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

/** API calls related to Services */

import * as API from "aws-amplify/api";
import { reportApiError } from "./";
import { sortByTimeAscending, sortByTimeDescending } from "../utils";

export async function fetchServiceByID(
  service_id: number,
): Promise<ServiceType | null> {
  try {
    const serviceResponse = await API.post({
      apiName: "auth",
      path: "/getServices",
      options: { body: { service_id } },
    }).response;
    const [service]: ServiceType[] = (await serviceResponse.body.json())!.rows;
    return service;
  } catch (err) {
    const msg = `Couldn't get the service type with id: ${service_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function fetchServices(): Promise<ServiceType[] | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getServices",
      options: {
        body: {
          limit: 1000,
        },
      },
    }).response;
    const serviceTypes: ServiceType[] = (await response.body.json())!.rows.sort(
      (s1, s2) => s1.service_id - s2.service_id,
    );
    return serviceTypes;
  } catch (err) {
    const msg = "Couldn't get service types:";
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function fetchServiceGuestsSlotted(
  service_id: number,
): Promise<GuestResponse[] | null> {
  try {
    const guestsSlotted = await (
      await API.post({
        apiName: "auth",
        path: "/serviceGuestsSlotted",
        options: { body: { service_id } },
      }).response
    ).body.json();
    return guestsSlotted;
  } catch (err) {
    const msg = `Couldn't get slotted guests for service with id: ${service_id}`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function fetchServiceGuestsQueued(
  service_id: number,
): Promise<GuestService[] | null> {
  try {
    const guestsQueuedResponse = await API.post({
      apiName: "auth",
      path: "/serviceGuestsQueued",
      options: { body: { service_id } },
    }).response;
    const unsortedGuestsQueued =
      (await guestsQueuedResponse.body.json()) as any as GuestService[];
    const guestsQueued = sortByTimeAscending(unsortedGuestsQueued, "queued_at");
    return guestsQueued as GuestService[];
  } catch (err) {
    const msg = `Couldn't get the qeued guests for service with id: ${service_id}`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function fetchServiceGuestsCompleted(
  service_id: number,
): Promise<GuestService[] | null> {
  try {
    const guestsCompletedResponse = await API.post({
      apiName: "auth",
      path: "/serviceGuestsCompleted",
      options: { body: { service_id } },
    }).response;
    const unsortedGuestsCompleted =
      (await guestsCompletedResponse.body.json())! as any as GuestService[];
    const guestsCompleted = sortByTimeDescending(
      unsortedGuestsCompleted,
      "completed_at",
    );
    return guestsCompleted as GuestService[];
  } catch (err) {
    const msg = `Couldn't get the guests who completed service with id: ${service_id}`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function updateGuestServiceStatus(
  newStatus: string,
  guest: GuestResponse,
  slotNum: number | null,
): Promise<number> {
  let updateGuestServiceStatusResponse = 200;
  try {
    updateGuestServiceStatusResponse = (
      await API.post({
        apiName: "auth",
        path: "/updateGuestServiceStatus",
        options: {
          body: {
            status: newStatus,
            guest_service_id: guest.guest_service_id,
            slot_id: slotNum,
          },
        },
      }).response
    ).statusCode;
  } catch (err) {
    const msg = `Couldn't update the service status for guest with id: ${guest.guest_id}, service with id: ${guest.guest_service_id}`;
    console.error(msg, err);
    reportApiError(msg, err);
  }
  return updateGuestServiceStatusResponse;
}

export async function getAvailableSlots(
  service: ServiceType,
): Promise<number[] | null> {
  try {
    const { service_id, quota } = service;

    let possibleSlotIds: number[] = Array.from(
      { length: quota },
      (_, i) => i + 1,
    );
    const guestsSlotted = await fetchServiceGuestsSlotted(service_id);
    if (!guestsSlotted) {
      throw new Error(
        `Couldn't get slotted guests for service with id: ${service_id}`,
      );
    }
    const occupiedSlots = guestsSlotted?.map((g) => g.slot_id);

    // compare possibleSlotIds with occupied slots, deduce available slots
    const availableSlots = possibleSlotIds.reduce(
      (accum: number[], curr: number, i) => {
        if (!occupiedSlots.includes(curr)) {
          accum.push(curr);
        }
        return accum;
      },
      [],
    ) as number[];
    return availableSlots;
  } catch (err) {
    const msg = `Couldn't get available slots for service type with id ${service.service_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function deleteServiceData(service_id: number) {
  let deleteServiceResponse = 200;
  try {
    deleteServiceResponse = (
      await API.post({
        apiName: "auth",
        path: "/deleteServiceData",
        options: { body: { service_id } },
      }).response
    ).statusCode;
  } catch (err) {
    const msg = `Couldn't delete data for service with id: ${service_id}`;
    console.error(msg, err);
    reportApiError(msg, err);
  }
  return deleteServiceResponse;
}

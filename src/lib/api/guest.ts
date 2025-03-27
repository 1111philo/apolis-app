/** Guest-related API calls */

import * as API from "aws-amplify/api";
import { reportApiError } from "./";
import { pageOffset } from "../utils";

export async function addGuest(g: Partial<Guest>): Promise<number | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/addGuest",
      options: { body: { ...(g as FormData) } },
    }).response;
    const { guest_id } =
      (await response.body.json()) as any as AddGuestAPIResponse;
    return guest_id;
  } catch (err) {
    const msg = "Couldn't add the guest:";
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function updateGuest(g: Partial<Guest>): Promise<boolean> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/updateGuest",
      options: { body: { ...(g as FormData) } },
    }).response;
    const { success } = (await response.body.json()) as any as SuccessResponse;
    return success;
  } catch (err) {
    const msg = `Couldnt update the guest with id: ${g.guest_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return false;
  }
}

export async function deleteGuest(guest_id: number): Promise<boolean> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/deleteGuest",
      options: { body: { guest_id } },
    }).response;
    const { success } = (await response.body.json()) as any as SuccessResponse;
    return success;
  } catch (err) {
    const msg = `Couldn't delete the guest with id: ${guest_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return false;
  }
}

export async function getGuestData(
  guest_id: number,
): Promise<GuestDataAPIResponse | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getGuestData",
      options: { body: { guest_id } },
    }).response;
    return (await response.body.json()) as any as GuestDataAPIResponse;
  } catch (err) {
    const msg = `Couldn't get data for guest with id: ${guest_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function getGuests(
  pageNum: number,
  limit = 10,
): Promise<GuestsAPIResponse | null> {
  const offset = pageOffset(pageNum);
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getGuests",
      options: { body: { offset, limit } },
    }).response;
    return (await response.body.json()) as any as GuestsAPIResponse;
  } catch (err) {
    const msg = `Couldn't get guests with offset: ${offset}, limit: ${limit}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function getGuestsData(
  pageNum: number,
  limit = 10,
): Promise<GuestsAPIResponse | null> {
  const offset = pageOffset(pageNum);
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getGuestsData",
      options: { body: { offset, limit } },
    }).response;
    return (await response.body.json()) as any as GuestsAPIResponse;
  } catch (err) {
    const msg = `Couldn't get guests data with offset: ${offset}, limit: ${limit}:`;
    console.log(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

/** Get guests with search query - first, last, dob, id. */
export async function getGuestsWithQuery(
  query: string,
): Promise<GuestsAPIResponse | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getGuests",
      options: { body: { query, offset: 0, limit: 50_000 } },
    }).response;
    return (await response.body.json()) as any as GuestsAPIResponse;
  } catch (err) {
    const msg = `Couldn't query guests with query: ${query}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

/** User-related API calls */

import * as API from "aws-amplify/api";
import { reportApiError } from "./";
import { pageOffset } from "../utils";

export async function addUser(
  u: Partial<User> & { password: string },
): Promise<number | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/addUser",
      options: { body: { ...u } },
    }).response;
    const { user_id } =
      (await response.body.json()) as any as AddUserAPIResponse;
    return user_id;
  } catch (err) {
    const msg = `Couldn't add the user with email: ${u.email}. Does a user with this email already exist? Error:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function updateUser(u: Partial<User>): Promise<boolean> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/updateUser",
      options: { body: { ...u } },
    }).response;
    const { success } = (await response.body.json()) as any as SuccessResponse;
    return success;
  } catch (err) {
    const msg = `Couldn't update the user with id: ${u.user_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return false;
  }
}

export async function deleteUser(user_id: number): Promise<boolean> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/deleteUser",
      options: { body: { user_id } },
    }).response;
    const { success } = (await response.body.json()) as any as SuccessResponse;
    return success;
  } catch (err) {
    const msg = `Couldn't delete the user with id: ${user_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return false;
  }
}

export async function getUserById(user_id: number): Promise<User | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getUser",
      options: { body: { user_id } },
    }).response;
    const getUserResp =
      (await response.body.json()) as any as GetUserAPIResponse;
    const { error, ...user } = getUserResp;
    if (error) throw new Error(error);
    return user;
  } catch (err) {
    const msg = `Couldn't get the user with id ${user_id}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getUser",
      options: { body: { email } },
    }).response;
    const getUserResp =
      (await response.body.json()) as any as GetUserAPIResponse;
    const { error, ...user } = getUserResp;
    if (error) throw new Error(error);
    return user;
  } catch (err) {
    const msg = `Couldn't get the user with email ${email}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function getUsers(
  pageNum: number,
  limit = 10,
): Promise<GetUsersAPIResponse | null> {
  const offset = pageOffset(pageNum);
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getUsers",
      options: { body: { offset, limit } },
    }).response;
    const usersResponse =
      (await response.body.json()) as any as GetUsersAPIResponse;
    return usersResponse;
  } catch (err) {
    const msg = `Couldn't get users with offset: ${offset}, limit: ${limit}`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

/** Get users with search query - first, last, dob, id. */
export async function getUsersWithQuery(
  query: string,
): Promise<GetUsersAPIResponse | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/getUsers",
      options: { body: { query, offset: 0, limit: 50_000 } },
    }).response;
    const usersResponse =
      (await response.body.json()) as any as GetUsersAPIResponse;
    return usersResponse;
  } catch (err) {
    const msg = `Couldn't get users with query: ${query}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

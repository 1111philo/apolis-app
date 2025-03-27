/** API calls related to Visit */

import * as API from "aws-amplify/api";
import { reportApiError } from "./";
import { pageOffset } from "../utils";

export async function addVisit(v: Partial<Visit>): Promise<number | null> {
  try {
    const response = await API.post({
      apiName: "auth",
      path: "/addVisit",
      options: { body: { ...(v as FormData) } },
    }).response;
    const { visit_id } =
      (await response.body.json()) as any as AddVisitAPIResponse;
    return visit_id;
  } catch (err) {
    const msg = `Couldn't add the visit for guest with id: ${v.guest_id}, services: ${v.service_ids}:`;
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

export async function getVisits(pageNum: number, limit = 10) {
  try {
    const offset = pageOffset(pageNum);
    const response = await API.post({
      apiName: "auth",
      path: "/getVisits",
      options: { body: { offset, limit } },
    }).response;
    const visitsResponse =
      (await response.body.json()) as any as GetVisitsAPIResponse;
    return visitsResponse;
  } catch (err) {
    const msg = "Couldn't get visits:";
    console.error(msg, err);
    reportApiError(msg, err);
    return null;
  }
}

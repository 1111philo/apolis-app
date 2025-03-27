import { rollbar } from "../../rollbar";

export function reportApiError(msg = "", err: Error) {
  if (!msg) {
    rollbar.error(err);
    return;
  }
  rollbar.error(msg, err);
}

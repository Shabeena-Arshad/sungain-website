import { Notify } from "quasar";

export function notify(message: string, type: string) {
  Notify.create({
    message: message,
    type: type,
    color: "primary"
  });
}

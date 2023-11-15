import * as crypto from "crypto";

export default function generateId() {
  return crypto.randomBytes(16).toString("hex");
}

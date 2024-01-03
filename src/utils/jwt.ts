import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../configs";

export function verify<T>(token: string) {
  const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
  return payload as T;
}

export function create(payload: object, expiresIn: string | number) {
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });
  return token;
}
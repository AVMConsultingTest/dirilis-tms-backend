import crypto from "crypto";
import * as bcrypt from "bcrypt";

export const generatePassword = (length = 8) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
  let password = "";
  do {
    password = Array.from(crypto.randomFillSync(new Uint8Array(length)))
      .map((byte) => charset[byte % charset.length])
      .join("");
  } while (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password));
  
  return password;
};

/*
    This function will generate a random salt and hash for a given password.
    It will return an object with the salt and hash.
*/
export const hashPassword = async (password: string) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
    
  return hashedPassword;
};
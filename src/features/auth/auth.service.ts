import { hash } from "bcryptjs";
import { findUserByEmail, createUser } from "@/repositories/user.repo";

export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role: "TEACHER", // default
  });

  return user;
};

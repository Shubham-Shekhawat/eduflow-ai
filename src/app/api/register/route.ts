import { registerController } from "@/features/auth/auth.controller";

export async function POST(req: Request) {
  return registerController(req);
}
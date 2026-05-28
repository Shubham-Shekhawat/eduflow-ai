import { registerUserService } from "./auth.service";

export const registerController = async (req: Request) => {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    await registerUserService(name, email, password);

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
};
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";

type bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{
  Bindings: bindings;
  Variables: {
    client: PrismaClient;
  };
}>();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/api/v2/hello", async (c) => {
  const callerName = c.req.query("name");
  const greeting = `Hello, ${callerName} !`;
  return c.json({ message: greeting });
});

app.post("/api/v1/auth", async (c) => {
  try {
    const client = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const existingUser = await client.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!existingUser) {
      const newUser = await client.user.create({
        data: {
          ...body,
        },
      });
      return c.json({ message: "successfully signed up", data: newUser });
    } else {
      if (body.password != existingUser.password)
        return c.json({ error: "incorrect password" });
      return c.json({ message: "successfully signed in", data: existingUser });
    }
  } catch (e: any) {
    return c.json({
      error: "Cannot login ",
    });
  }
});

export default app;

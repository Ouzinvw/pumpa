import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const { id, email_addresses, first_name, last_name } = await req.json();

    const user = await prisma.user.create({
      data: {
        id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

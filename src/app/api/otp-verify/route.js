import { findUserByEmail } from "@/app/lib/schema/user";
import { updateUser } from "@/app/lib/schema/user";

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    const user = await findUserByEmail(email);
    if (!user) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    const now = new Date();
    if (user.otp !== otp || user.otpExpiry < now) {
      return Response.json({ error: "Invalid or expired OTP." }, { status: 400 });
    }

    await updateUser(email, {isVerified: true, otp: null, otpExpiry: null});
    return Response.json({ message: "OTP verified successfully." });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

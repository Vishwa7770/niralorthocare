import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { fullName, phone, date, timeSlot, reason } = data;

    // Server-side validation
    if (!fullName || !phone || !date || !timeSlot || !reason) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Simulate database insertion or emailing the admin
    // E.g., sendMail({ to: 'admin@niralorthocare.com', subject: 'New Appointment', body: data })
    console.log("Appointment Request Captured successfully:", data);

    return NextResponse.json(
      { success: true, message: "Appointment request received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Appointment Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process appointment request." },
      { status: 500 }
    );
  }
}

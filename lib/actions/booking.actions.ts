"use server";

import  Booking  from "@/database/booking.model";
import connectDB from "../mongodb";

export const createBooking = async ({ email, eventId }:{ email: string, eventId: string }) =>    {
    try {
        await connectDB();
        // Check if the booking already exists
        const existingBooking = await Booking.findOne({ email, eventId });
        if (existingBooking) {
            throw new Error("You have already booked this event.");
        }

        await Booking.create({ email, eventId });
        return {success: true};
    } catch (error) {
        console.error("Error creating booking:", error);
        return {success: false};
    }
}
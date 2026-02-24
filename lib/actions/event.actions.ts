"use server";
import { Event } from "@/database";
import connectDB from "../mongodb";

export const getAllEvents = async () => {
  try {
    await connectDB();
    return await Event.find().sort({ createdAt: -1 }).lean();
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    await connectDB();
    const normalizedSlug = slug.trim().toLowerCase();
    return await Event.findOne({ slug: normalizedSlug }).lean();
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }
};

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const normalizedSlug = slug.trim().toLowerCase();
    const event = await Event.findOne({ slug: normalizedSlug }).lean();

    if (!event || !Array.isArray(event.tags) || event.tags.length === 0) {
      return [];
    }

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch (error) {
    console.error("Error fetching similar events:", error);
    return [];
  }
};

"use cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import EventCard from "@/components/EventCard";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const bookings = 10;
const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {JSON.parse(agendaItems[0])?.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const res = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {
    event: {
      description,
      title,
      location,
      date,
      time,
      image,
      mode,
      overview,
      agenda,
      audience,
      tags,
      organizer,
    },
  } = await res.json();
  
  const similarEvents : IEvent[] = await getSimilarEventsBySlug(slug);

  if (!description) return notFound();
  return (
    <Suspense fallback={<div className="text-center">Loading data for you...</div>}>
      <section id="event">
        <div className="header">
          <h1>Event Description</h1>
          <p>{description}</p>
        </div>
        <div className="details">
          <div className="content">
            <Image
              src={image}
              alt={title}
              width={800}
              height={600}
              className="banner"
            />
            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>Event Details</h2>
              {/* rendering all the event details such as date time location mode audience with the icons */}
              <div className="flex-row-gap-2 items-center">
                <Image
                  src="/icons/calendar.svg"
                  alt="date"
                  width={14}
                  height={14}
                />
                <p>Date: {date}</p>
              </div>
              <div className="flex-row-gap-2 items-center">
                <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                <p>Time: {time}</p>
              </div>
              <div className="flex-row-gap-2 items-center">
                <Image
                  src="/icons/pin.svg"
                  alt="location"
                  width={14}
                  height={14}
                />
                <p>Location: {location}</p>
              </div>
              <div className="flex-row-gap-2 items-center">
                <Image src="/icons/mode.svg" alt="mode" width={14} height={14} />
                <p>Mode: {mode}</p>
              </div>
              <div className="flex-row-gap-2 items-center">
                <Image
                  src="/icons/audience.svg"
                  alt="audience"
                  width={14}
                  height={14}
                />
                <p>Audience: {audience}</p>
              </div>
            </section>
            <EventAgenda agendaItems={agenda} />
            <section className="flex-col-gap-2">
              {/* About the organizer */}
              <h2>About the organizer</h2>
              <p>{organizer}</p>
            </section>
            <section className="flex-col-gap-2">
              <h2>Tags</h2>
              <div className="flex flex-row flex-wrap gap-2">
                {JSON.parse(tags)?.map((tag: string) => (
                  // Rendering tags in small nice looking cubes
                  <div key={tag} className="pill">
                    {tag}
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className="booking">
            <div className="signup-card">
              <h2>Book Your Spot</h2>
              <p className="text-sm">
                {bookings > 0 ? `Join ${bookings} people who have already booked their spot` : "Be the first person to book your spot"}
              </p>
              <BookEvent />
            </div>
          </aside>
        </div>
        <div className="flex w-full flex-col gap-4 pt-20">
          <h2>Similar Events</h2>
          <div className="events">
            {similarEvents.length > 0 ? (
              similarEvents.map((similarEvent: IEvent) => (
                <EventCard key={similarEvent.title} {...similarEvent} />
              ))
            ) : (
              <p>No similar events found.</p>
            )}
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default EventDetailsPage;

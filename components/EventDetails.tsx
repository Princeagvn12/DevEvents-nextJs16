import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";

type EventData = {
  _id: string | { toString(): string };
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: unknown;
  organizer: string;
  tags: unknown;
};

type EventDetailsProps = {
  event: EventData;
  slug: string;
  similarEvents: EventData[];
  bookings?: number;
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    if (value.length === 1 && typeof value[0] === "string") {
      try {
        const parsed = JSON.parse(value[0]);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item));
        }
      } catch {
        // no-op, fallback to casting below
      }
    }

    return value.map((item) => String(item));
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item));
      }
    } catch {
      return [];
    }
  }

  return [];
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  if (!agendaItems.length) {
    return null;
  }

  return (
    <div className="agenda">
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EventDetails = ({
  event,
  slug,
  similarEvents,
  bookings = 10,
}: EventDetailsProps) => {
  const agendaItems = toStringArray(event.agenda);
  const tags = toStringArray(event.tags);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>
      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={600}
            className="banner"
          />
          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <div className="flex-row-gap-2 items-center">
              <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
              <p>Date: {event.date}</p>
            </div>
            <div className="flex-row-gap-2 items-center">
              <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
              <p>Time: {event.time}</p>
            </div>
            <div className="flex-row-gap-2 items-center">
              <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
              <p>Location: {event.location}</p>
            </div>
            <div className="flex-row-gap-2 items-center">
              <Image src="/icons/mode.svg" alt="mode" width={14} height={14} />
              <p>Mode: {event.mode}</p>
            </div>
            <div className="flex-row-gap-2 items-center">
              <Image src="/icons/audience.svg" alt="audience" width={14} height={14} />
              <p>Audience: {event.audience}</p>
            </div>
          </section>
          <EventAgenda agendaItems={agendaItems} />
          <section className="flex-col-gap-2">
            <h2>About the organizer</h2>
            <p>{event.organizer}</p>
          </section>
          <section className="flex-col-gap-2">
            <h2>Tags</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {tags.map((tag) => (
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
              {bookings > 0
                ? `Join ${bookings} people who have already booked their spot`
                : "Be the first person to book your spot"}
            </p>
            <BookEvent eventId={String(event._id)} slug={slug} />
          </div>
        </aside>
      </div>
      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 ? (
            similarEvents.map((similarEvent) => (
              <EventCard key={similarEvent.slug} {...similarEvent} />
            ))
          ) : (
            <p>No similar events found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;

import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { getAllEvents } from "@/lib/actions/event.actions";
import { Suspense } from "react";

const EventsList = async () => {
  const events = await getAllEvents();

  if (!events.length) {
    return <p>No events found.</p>;
  }

  return (
    <ul className="events">
      {events.map((event: any) => (
        <li key={event.slug}>
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  );
};

const Page = () => {
  return (
    <section>
      <h1 className="text-center">The Hub for Every Dev Event You Mustn't Miss</h1>
      <p className="mt-5 text-center">Hackatons, Meetups, Conferences, All In One Place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <Suspense fallback={<div className="text-center">Loading data for you...</div>}>
          <EventsList />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;

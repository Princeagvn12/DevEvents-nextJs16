import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database/event.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const page = async () => {
  const res = await fetch(`${BASE_URL}/api/events`);
  const {events} = await res.json();
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev Event You Mustn't Miss
      </h1>
      <p className="mt-5 text-center">Hackatons, Meetups, Conferences, All In One Place</p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent)=>(
              <li key={event.slug}><EventCard {...event}/></li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;

import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";


const page = () => {
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
          {events.map((event)=>(
              <li key={event.slug}><EventCard title={event.title} image={event.image} slug={event.slug} location={event.location} date={event.date} time={event.time}/></li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default page;

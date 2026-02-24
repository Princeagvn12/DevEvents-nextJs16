
import EventDetails from "@/components/EventDetails";
import { getEventBySlug, getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type EventDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

const EventDetailsContent = async ({ params }: EventDetailsPageProps) => {
  const { slug } = await params;
  const [event, similarEvents] = await Promise.all([
    getEventBySlug(slug),
    getSimilarEventsBySlug(slug),
  ]);

  if (!event) {
    notFound();
  }

  return <EventDetails event={event} slug={slug} similarEvents={similarEvents} />;
};

const EventDetailsPage = ({ params }: EventDetailsPageProps) => {
  return (
    <div>
      <Suspense fallback={<div className="text-center">Loading data for you...</div>}>
        <EventDetailsContent params={params} />
      </Suspense>
    </div>
  );
};

export default EventDetailsPage;

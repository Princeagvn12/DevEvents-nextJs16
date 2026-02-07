export interface EventItems {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItems[] = [
  {
    title: "Google I/O 2026",
    image: "/images/event1.png",
    slug: "google-io-2026",
    location: "Mountain View, CA, USA",
    date: "May 12-14, 2026",
    time: "10:00 AM PT"
  },
  {
    title: "React Summit Amsterdam",
    image: "/images/event2.png",
    slug: "react-summit-amsterdam-2026",
    location: "Amsterdam, Netherlands",
    date: "June 17-19, 2026",
    time: "9:00 AM CET"
  },
  {
    title: "AWS re:Invent",
    image: "/images/event3.png",
    slug: "aws-reinvent-2026",
    location: "Las Vegas, NV, USA",
    date: "November 30 - December 4, 2026",
    time: "8:00 AM PT"
  },
  {
    title: "PyCon US 2026",
    image: "/images/event4.png",
    slug: "pycon-us-2026",
    location: "Pittsburgh, PA, USA",
    date: "April 22-28, 2026",
    time: "9:00 AM ET"
  },
  {
    title: "ETHGlobal Hackathon",
    image: "/images/event5.png",
    slug: "ethglobal-paris-2026",
    location: "Paris, France",
    date: "July 21-23, 2026",
    time: "10:00 AM CET"
  },
  {
    title: "GitHub Universe",
    image: "/images/event6.png",
    slug: "github-universe-2026",
    location: "San Francisco, CA, USA",
    date: "October 28-29, 2026",
    time: "9:00 AM PT"
  }
];

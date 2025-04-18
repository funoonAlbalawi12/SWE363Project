const defaultEvents = [
  {
    id: "gaming+",
    title: "Gaming+",
    date: "Sunday, February 16 | 05:00 PM",
    location: "Building 22, KFUPM",
    img: "/images/gamingPlus.svg",
    status: "used",
    qrCode: "GMPL-00123",
    name: "Khulud Alotaibi",
    email: "khulud@gmail.com",
  },
];

(() => {
  const existing = JSON.parse(localStorage.getItem("my_events")) || [];
  const merged = [...existing];

  defaultEvents.forEach((event) => {
    const exists = merged.some(
      (e) => e.id === event.id && e.status === event.status
    );
    if (!exists) merged.push(event);
  });

  localStorage.setItem("my_events", JSON.stringify(merged));
})();

export const addEventToMyEvents = (event) => {
  const existing = JSON.parse(localStorage.getItem("my_events")) || [];

  const alreadyExists = existing.some((e) => e.id === event.id);
  if (!alreadyExists) {
    existing.push(event);
    localStorage.setItem("my_events", JSON.stringify(existing));
  }
};

export const getUpcomingEvents = () => {
  const events = JSON.parse(localStorage.getItem("my_events")) || [];
  return events.filter((e) => e.status === "upcoming");
};

export const getUsedEvents = () => {
  const events = JSON.parse(localStorage.getItem("my_events")) || [];
  return events.filter((e) => e.status === "used");
};

const initialEvents = [
    {
      id: 1,
      title: 'Hackathon 2025',
      description: '48-hour coding challenge open to all KFUPM students.',
      date: '2025-03-10',
      location: 'Building 11, Innovation Lab',
    },
    {
      id: 2,
      title: 'AI & Society Talk',
      description: 'Discussion on the impact of AI in modern life.',
      date: '2025-03-15',
      location: 'Auditorium 5, Building 54',
    },
  ];
  
  let clubEvents = [...initialEvents];
  
  export function getEvents() {
    return clubEvents;
  }
  
  export function addEvent(event) {
    clubEvents = [event, ...clubEvents];
  }
  
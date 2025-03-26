

const Events = () => {
  const events = [
    { name: "Sports Day", date: "2024-12-01", location: "School Grounds" },
    { name: "Science Fair", date: "2024-12-10", location: "Auditorium" },
    { name: "Graduation Day", date: "2024-12-20", location: "Main Hall" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-green-900 to-blue-700 p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded shadow hover:bg-gray-100">
              <h2 className="text-xl font-bold">{event.name}</h2>
              <p className="text-gray-600">
                <span className="font-bold">Date:</span> {event.date}
              </p>
              <p className="text-gray-600">
                <span className="font-bold">Location:</span> {event.location}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Events;

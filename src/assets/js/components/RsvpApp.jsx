import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';

function buildAttendancesPath(eventId) {
  return `/events/${eventId}/attendances`;
}

const fetchAttendances = (eventId) => (
  fetch(buildAttendancesPath(eventId))
    .then(response => response.json())
);

function RsvpApp(props) {
  const { data: { eventId, userId } } = props;
  const [loading, setLoading] = useState(true);
  const [userAttending, setUserAttending] = useState(false);

  useEffect(() => {
    fetchAttendances(eventId)
      .then((attendances) => {
        const isAttending = attendances.map(({ id }) => id).includes(Number(userId));
        setUserAttending(isAttending);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <button
      className="btn"
      type="submit"
      disabled={userAttending}
    >
      {userAttending ? 'Ya marcaste tu asistencia' : 'Asistiré'}
    </button>
  );
};

export default hot(module)(RsvpApp);

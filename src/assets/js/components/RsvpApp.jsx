import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import Button from './RsvpButton';

function buildAttendancesPath(eventId) {
  return `/events/${eventId}/attendances`;
}

const fetchAttendances = (eventId) => (
  fetch(buildAttendancesPath(eventId))
    .then(response => response.json())
);

const createAttendance = (eventId, userId) => (
  fetch(buildAttendancesPath(eventId), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  })
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

  const handleRsvpClick = () => {
    setLoading(true);
    createAttendance(eventId, userId)
      .then((response) => {
        if (response.status === 201) {
          setUserAttending(true);
          setLoading(false);
        }
      })
  };

  return (
    <Button
      disabled={loading || userAttending}
      onClick={handleRsvpClick}
      text={loading
        ? 'Cargando...'
        : (userAttending ? 'Ya marcaste tu asistencia' : 'Asistiré')
      }
    />
  );
};

export default hot(module)(RsvpApp);

import { useState } from 'react'

const SPACES = [
  'Quiet Study Room',
  'Group Discussion Room',
  'Computer Lab',
  'Meeting Room',
]

function SpaceBookingPage() {
  const [space, setSpace] = useState(SPACES[0])
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setConfirmation(null)

    if (endTime <= startTime) {
      setError('The end time must be after the start time.')
      return
    }

    // The backend has no booking feature yet, so we only show a confirmation here.
    setConfirmation({ space, date, startTime, endTime })
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Book a space</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Space</label>
          <select
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          >
            {SPACES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">Start time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium text-gray-700">End time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Book space
        </button>
      </form>

      {confirmation && (
        <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4 text-sm text-green-800">
          Booking request ready: {confirmation.space} on {confirmation.date}, from{' '}
          {confirmation.startTime} to {confirmation.endTime}.
        </div>
      )}
    </div>
  )
}

export default SpaceBookingPage
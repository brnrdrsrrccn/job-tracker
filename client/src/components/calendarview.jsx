import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const CalendarView = ({ jobs }) => {
  const [value, setValue] = useState(new Date());

  // Convert to yyyy-mm-dd for comparison
  const selectedDate = value.toLocaleDateString("en-CA");
  const jobsOnDate = (jobs || []).filter((job) => job.deadline === selectedDate);

  return (
    <div className="bg-gray-300 dark:bg-gray-800 dark:text-black rounded shadow p-4">
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={({ date }) => {
          const d = date.toLocaleDateString("en-CA");
          const hasJob = (jobs || []).some((job) => job.deadline === d);
          return hasJob ? (
            <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full mx-auto" />
          ) : null;
        }}
      />
      <div className="mt-4">
        <h3 className="font-semibold text-black dark:text-white">Jobs on {selectedDate}:</h3>
        <ul className="list-disc ml-6 mt-1 text-sm dark:text-white">
          {jobsOnDate.length > 0 ? (
            jobsOnDate.map((job) => (
              <li key={job.id}>
                {job.position} at {job.company}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No deadlines</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CalendarView;

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CalendarView from "../components/calendarview";
import lightBg from "../assets/bg-light.jpg";
import darkBg from "../assets/bg-dark.jpg";
import { getJobs, addJob, updateJob, deleteJob } from '../services/jobService';


const Dashboard = () => {
  const [jobs, setJobs] = useState([]);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error.response?.data || error.message);
        toast.error('Failed to fetch jobs');
      }
    };

    fetchJobs();
  }, []);

  const [statusFilter, setStatusFilter] = useState("All");
  const [editingJob, setEditingJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    deadline: "",
    notes: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddJob = async (jobData) => {
    try {
      const newJob = await addJob(jobData);
      setJobs((prev) => [...prev, newJob]);
      toast.success('Job added successfully');
    } catch (error) {
      console.error('Error adding job:', error.response?.data || error.message);
      toast.error('Failed to add job');
    }
  };

  const handleUpdateJob = async (id, updatedData) => {
    try {
      const updatedJob = await updateJob(id, updatedData);
      setJobs((prev) => prev.map((job) => (job._id === id ? updatedJob : job)));
      toast.success('Job updated successfully');
    } catch (error) {
      console.error('Error updating job:', error.response?.data || error.message);
      toast.error('Failed to update job');
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error.response?.data || error.message);
      toast.error('Failed to delete job');
    }
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (editingJob) {
      await handleUpdateJob(editingJob._id, form);
    } else {
      await handleAddJob(form);
    }
    setForm({ company: "", position: "", status: "Applied", deadline: "", notes: "" });
    setEditingJob(null);
    setShowModal(false);
  } catch (error) {
    toast.error('Error saving job');
  }
  };


  

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 pt-24" style={{
    backgroundImage: `url(${darkMode ? darkBg : lightBg})`,}}>

      <div className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gray-500 dark:bg-gray-950 dark:text-gray-100 text-gray-200 opacity-75">
        <h1 className="text-4xl font-bold">📋 Job Tracker Dashboard</h1>
        <div className="flex items-center gap-2">
    <button
      onClick={() => setShowModal(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      + Add Job
    </button>
    <button
      onClick={() => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark");
      }}
      className="bg-black text-white px-4 py-2 border-black rounded hover:bg-gray-100 hover:text-black dark:bg-gray-700 dark:text-gray-100 dark:border-gray-100 dark:hover:bg-black dark:hover:text-white"
    >
      {darkMode ? "🌞 Light" : "🌙 Dark"}
    </button>
    <button
      onClick={() => {
        // fake logout for now
        window.location.href = "/";
      }}
      className="bg-red-900 text-white px-4 py-2 border-red rounded hover:bg-red-300 hover:text-red-900 dark:hover:bg-white dark:border-red-900"
    >
      Logout
    </button>
    </div>
    </div>
    <div className="flex flex-wrap items-center gap-4 mb-4">
        
      <div className="flex gap-2 flex-wrap">
        {["All", "Applied", "Interviewing", "Offer", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1 rounded border ${
            statusFilter === status
              ? "bg-blue-500 text-white border-blue-600"
              : "bg-white dark:bg-gray-800 text-gray-800 border-gray-300 dark:text-white"
                } hover:bg-blue-500 dark:hover:bg-blue-400 dark:hover:text-black`}
          >
          {status}
          </button>
        ))}
        </div>
        <input
          type="text"
          placeholder="Search company or position..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white dark:bg-gray-800 dark:text-white px-4 py-2 border border-gray-300 rounded w-full sm:w-64"
        />
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
        {["Applied", "Interviewing", "Offer", "Rejected"].map((status) => {
            const count = jobs?.filter((job) => job.status === status).length || 0;
            return (
            <div
                key={status}
                className="bg-white dark:bg-gray-800 border rounded px-4 py-2 shadow text-sm"
            >
                <span className="font-semibold">{status}:</span> {count}
            </div>
            );
        })}
        </div>
      <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="flex-[4] overflow-x-auto bg-gray-300 dark:bg-gray-700 rounded shadow-md">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-400 dark:bg-gray-800">
            <tr>
              <th className="p-4 font-medium text-gray-700 dark:text-white">Company</th>
              <th className="p-4 font-medium text-gray-700 dark:text-white">Position</th>
              <th className="p-4 font-medium text-gray-700 dark:text-white">Status</th>
              <th className="p-4 font-medium text-gray-700 dark:text-white">Deadline</th>
              <th className="p-4 font-medium text-gray-700 dark:text-white">Notes</th>
              <th className="p-4 font-medium text-gray-700 dark:text-white"></th>
            </tr>
          </thead>
          <tbody>
            {(jobs || []).filter((job) =>
                    statusFilter === "All" ? true : job.status === statusFilter
                ) 
                .filter((job) =>
                    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    job.position.toLowerCase().includes(searchQuery.toLowerCase())
                ) 
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .map((job) => (
              <tr key={job._id} className="border-t">
                <td className="p-4">{job.company}</td>
                <td className="p-4">{job.position}</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full
                    ${job.status === "Applied" && "bg-blue-100 text-blue-700"}
                    ${job.status === "Interviewing" && "bg-yellow-100 text-yellow-700"}
                    ${job.status === "Offer" && "bg-green-100 text-green-700"}
                    ${job.status === "Rejected" && "bg-red-100 text-red-700"}
                  `}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="p-4">
                  {job.deadline ? new Date(job.deadline).toLocaleDateString("en-CA") : "N/A"}
                </td>
                <td
                  className="max-w-xs truncate whitespace-nowrap overflow-hidden cursor-pointer text-blue-600 hover:underline"
                  onClick={() => {
                    setSelectedNote(job.notes);
                    setShowNoteModal(true);
                  }}
                  title="Click to view full note"
                >
                  {job.notes}
                </td>
                <td className="p-4 flex gap-2">
                <button
                    onClick={() => {
                    setForm(job);
                    setEditingJob(job);
                    setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                >
                    Edit 📝
                </button>
                <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="text-red-600 hover:underline"
                >
                    Delete 🗑️
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex-[1] w-full ">
        <CalendarView jobs={jobs} />
      </div>
      </div>

      {/* Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-2">📝 Full Note</h3>
            <p className="text-sm whitespace-pre-wrap">{selectedNote}</p>
            <div className="text-right mt-4">
              <button
                onClick={() => setShowNoteModal(false)}
                className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-lg shadow-lg relative"
          >
            <h2 className="text-xl font-semibold mb-4">Add New Job</h2>

            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded dark:bg-white dark:text-black"
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={form.position}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded dark:bg-white dark:text-black"
              required
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded dark:bg-white dark:text-black"
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full mb-3 px-4 py-2 border rounded dark:bg-white dark:text-black"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded dark:bg-white dark:text-black"
            ></textarea>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-400 rounded dark:bg-white dark:text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-white dark:text-black"
              >
                Save Job
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default Dashboard;

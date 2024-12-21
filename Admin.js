import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [subject, setSubject] = useState('');
    const [timetables, setTimetables] = useState([]);

    // Fetch all timetables
    const fetchTimetables = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/timetable');
            setTimetables(response.data);
        } catch (err) {
            console.error('Failed to fetch timetables:', err);
        }
    };

    useEffect(() => {
        fetchTimetables();
    }, []);

    // Add a new timetable
    const addTimetable = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/timetable', { date, time, subject });
            alert('Timetable added successfully');
            fetchTimetables(); // Refresh timetable list
            setDate('');
            setTime('');
            setSubject('');
        } catch (err) {
            alert('Failed to add timetable');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Admin Dashboard</h1>

            {/* Form to Add Timetable */}
            <form onSubmit={addTimetable} style={{ marginBottom: '30px' }}>
                <h2>Add New Timetable</h2>
                <div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{ padding: '10px', margin: '10px', width: '200px' }}
                    />
                </div>
                <div>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        style={{ padding: '10px', margin: '10px', width: '200px' }}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        style={{ padding: '10px', margin: '10px', width: '200px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>
                    Add Timetable
                </button>
            </form>

            {/* Timetable List */}
            <h2>All Timetables</h2>
            {timetables.length > 0 ? (
                <table
                    border="1"
                    style={{
                        margin: 'auto',
                        borderCollapse: 'collapse',
                        width: '80%',
                        textAlign: 'center',
                    }}
                >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetables.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No timetables available</p>
            )}
        </div>
    );
};

export default AdminDashboard;

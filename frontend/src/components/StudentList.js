import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/students")
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-3">Student List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.class}</td>
                            <td>{student.contact}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default StudentList;

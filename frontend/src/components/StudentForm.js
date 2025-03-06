import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const StudentForm = ({ refreshStudents }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [contact, setContact] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/students", { name, age, class: studentClass, contact });
            setSuccess("Student Added Successfully!");
            setError(null);
            refreshStudents();  // Refresh the student list after adding
            setName(""); setAge(""); setStudentClass(""); setContact("");  // Clear input fields
        } catch (err) {
            setError("Failed to add student. Please try again.");
            setSuccess(null);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Add New Student</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter age" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Department" 
                        value={studentClass} 
                        onChange={(e) => setStudentClass(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter contact" 
                        value={contact} 
                        onChange={(e) => setContact(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Student
                </Button>
            </Form>
        </Container>
    );
};

export default StudentForm;

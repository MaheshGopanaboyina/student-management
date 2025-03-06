import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";

const StudentForm = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [contact, setContact] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/students", { name, age, class: studentClass, contact });
        alert("Student Added!");
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Add New Student</h2>
            <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" onChange={(e) => setAge(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Control type="text" placeholder="Enter Department" onChange={(e) => setStudentClass(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control type="text" placeholder="Enter contact" onChange={(e) => setContact(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Student
                </Button>
            </Form>
        </Container>
    );
};

export default StudentForm;

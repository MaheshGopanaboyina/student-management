import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Modal, Form } from "react-bootstrap";

const StudentList = ({ refreshTrigger }) => {
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);

    // Fetch students from the backend
    const fetchStudents = () => {
        axios.get("http://localhost:5000/students")
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));
    };

    useEffect(() => {
        fetchStudents();
    }, [refreshTrigger]);

    // Delete student function
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await axios.delete(`http://localhost:5000/students/${id}`);
                fetchStudents();  // Refresh list after deletion
            } catch (error) {
                console.error("Error deleting student:", error);
            }
        }
    };

    // Open the edit modal with student data
    const handleEdit = (student) => {
        setCurrentStudent(student);
        setShowModal(true);
    };

    // Update student data
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/students/${currentStudent._id}`, currentStudent);
            setShowModal(false);
            fetchStudents();  // Refresh list after update
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.class}</td>
                            <td>{student.contact}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(student)}>
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(student._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Student Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentStudent && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentStudent.name}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={currentStudent.age}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, age: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Department</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentStudent.class}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, class: e.target.value })}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={currentStudent.contact}
                                    onChange={(e) => setCurrentStudent({ ...currentStudent, contact: e.target.value })}
                                    required
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default StudentList;

import React from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import { Container, Navbar } from "react-bootstrap";

function App() {
    return (
        <>
            <Navbar bg="dark" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Student Management System</Navbar.Brand>
                </Container>
            </Navbar>

            <Container>
                <StudentForm />
                <StudentList />
            </Container>
        </>
    );
}

export default App;

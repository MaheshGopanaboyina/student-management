import React, { useState } from "react";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import { Container, Navbar } from "react-bootstrap";

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    // Function to refresh the student list
    const refreshStudents = () => {
        setRefreshTrigger(prev => !prev);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" className="mb-4">
                <Container>
                    <Navbar.Brand>Student Management System</Navbar.Brand>
                </Container>
            </Navbar>

            <Container>
                <StudentForm refreshStudents={refreshStudents} />
                <StudentList refreshTrigger={refreshTrigger} />
            </Container>
        </>
    );
}

export default App;

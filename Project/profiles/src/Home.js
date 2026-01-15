import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Container, Row, Col, Card } from "react-bootstrap";

function Home() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");

  // Real-time listener to get all profiles
  useEffect(() => {
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            image: data.image || "",
            status: data.status || "Active",
            age: data.age || 0,
            employment: data.employment || "Employed",
            interests: data.interests || [],
          };
        })
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Modeling Profiles</h2>

      <Row className="g-4">
        {users.map((user) => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              {user.image && (
                <Card.Img
                  variant="top"
                  src={user.image}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <strong>Status:</strong> {user.status} <br />
                  <strong>Age:</strong> {user.age} <br />
                  <strong>Employment:</strong> {user.employment} <br />
                  <strong>Interests:</strong>{" "}
                  {user.interests.length ? user.interests.join(", ") : "None"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;

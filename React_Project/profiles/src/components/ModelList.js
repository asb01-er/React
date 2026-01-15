import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Row, Col, Card } from "react-bootstrap";

function ModelList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <Row className="g-4">
      {users.map((user) => (
        <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 shadow-sm">
            {user.images?.[0] && (
              <Card.Img
                variant="top"
                src={user.images[0]}
                style={{ height: "250px", objectFit: "cover" }}
              />
            )}
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>
                <strong>Status:</strong> {user.status} <br />
                <strong>Age:</strong> {user.age} <br />
                <strong>Employment:</strong>{" "}
                {user.professional?.employment || "—"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ModelList;

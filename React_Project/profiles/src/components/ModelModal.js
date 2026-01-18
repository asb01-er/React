import { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form, Badge } from "react-bootstrap";
import axios from "axios";
import { auth } from "./auth";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";


function ModelModal({ model, onClose, onDelete, refreshModels }) {
  const history = useHistory();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        history.push("/Login");
      }
    });
    return () => unsub();
  }, [history]);

  const [isEditing, setIsEditing] = useState(false);
  const [editedModel, setEditedModel] = useState({ ...model });

  const handleChange = (section, field, value) => {
    if (section) {
      setEditedModel({
        ...editedModel,
        [section]: { ...editedModel[section], [field]: value },
      });
    } else {
      setEditedModel({ ...editedModel, [field]: value });
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:4000/models/${model.id}`,
        editedModel
      );
      setIsEditing(false);
      refreshModels();
    } catch (err) {
      console.error(err);
      alert("Failed to save changes");
    }
  };

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{model.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={6}>
            {isEditing ? (
              <Form.Control
                value={editedModel.name}
                onChange={(e) => handleChange(null, "name", e.target.value)}
                className="mb-2"
              />
            ) : (
              <img
                src={model.images[0]}
                alt={model.name}
                className="img-fluid rounded mb-2"
              />
            )}

            <div className="d-flex gap-2 flex-wrap">
              {model.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
              ))}
            </div>
          </Col>

          <Col md={6}>
            {isEditing ? (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={editedModel.age}
                    onChange={(e) =>
                      handleChange(null, "age", Number(e.target.value))
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    value={editedModel.gender}
                    onChange={(e) =>
                      handleChange(null, "gender", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    value={editedModel.nationality}
                    onChange={(e) =>
                      handleChange(null, "nationality", e.target.value)
                    }
                  />
                </Form.Group>

                <h6>Physical</h6>
                <Form.Group className="mb-2">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="number"
                    value={editedModel.physical.height}
                    onChange={(e) =>
                      handleChange(
                        "physical",
                        "height",
                        Number(e.target.value)
                      )
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Hair Color</Form.Label>
                  <Form.Control
                    value={editedModel.physical.hairColor}
                    onChange={(e) =>
                      handleChange("physical", "hairColor", e.target.value)
                    }
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <p>
                  <strong>Age:</strong> {model.age}
                </p>
                <p>
                  <strong>Gender:</strong> {model.gender}
                </p>
                <p>
                  <strong>Nationality:</strong> {model.nationality}
                </p>

                <h6>Physical</h6>
                <p>Height: {model.physical.height} cm</p>
                <p>Hair: {model.physical.hairColor}</p>
              </>
            )}

            {!isEditing && (
              <h6>Skills</h6>
            )}
            {!isEditing &&
              model.skills?.specialSkills?.map((s, i) => (
                <Badge bg="secondary" key={i} className="me-1">
                  {s}
                </Badge>
              ))}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        {!isEditing ? (
          <>
            <Button variant="warning" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDelete(model.id)}>
              Delete
            </Button>
          </>
        ) : (
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModelModal;

import { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { auth } from "./auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

function ModelModal({ model, onClose, onDelete, refreshModels }) {
  const history = useHistory();

  /* ----------------------------------------------------
     AUTH GUARD
     Redirect user to login if not authenticated
  ---------------------------------------------------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        history.push("/Login");
      }
    });

    return () => unsub();
  }, [history]);

  /* ----------------------------------------------------
     STATE
  ---------------------------------------------------- */
  const [isEditing, setIsEditing] = useState(false);

  // This holds the editable copy of the model
  const [editedModel, setEditedModel] = useState({});

  /* ----------------------------------------------------
     SYNC MODEL → EDITED MODEL
     Runs every time a new model is passed in
  ---------------------------------------------------- */
  useEffect(() => {
    setEditedModel(model);
  }, [model]);

  /* ----------------------------------------------------
     HANDLE INPUT CHANGES
     Uses functional updates to avoid stale state bugs
  ---------------------------------------------------- */
  const handleChange = (section, field, value) => {
    setEditedModel((prev) => {
      // For nested objects like "physical"
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }

      // For top-level fields
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  /* ----------------------------------------------------
     SAVE CHANGES TO BACKEND
  ---------------------------------------------------- */
  const handleSave = async () => {
  try {
    const modelRef = doc(db, "model_db", model.id);

    await updateDoc(modelRef, editedModel);

    setIsEditing(false);
    refreshModels();      // re-fetch list
    onClose();            // close modal
  } catch (error) {
    console.error("Error updating model:", error);
    alert("Failed to save changes");
  }
};


  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */
  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{model.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          {/* ---------------- LEFT COLUMN ---------------- */}
          <Col md={6}>
            {isEditing ? (
              <Form.Control
                className="mb-2"
                value={editedModel.name || ""}
                onChange={(e) =>
                  handleChange(null, "name", e.target.value)
                }
              />
            ) : (
              <img
                src={model.images?.[0]}
                alt={model.name}
                className="img-fluid rounded mb-2"
              />
            )}

            {/* Thumbnails */}
            <div className="d-flex gap-2 flex-wrap">
              {model.images?.map((img, i) => (
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

          {/* ---------------- RIGHT COLUMN ---------------- */}
          <Col md={6}>
            {isEditing ? (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={editedModel.age || ""}
                    onChange={(e) =>
                      handleChange(null, "age", Number(e.target.value))
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    value={editedModel.gender || ""}
                    onChange={(e) =>
                      handleChange(null, "gender", e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    value={editedModel.nationality || ""}
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
                    value={editedModel.physical?.height || ""}
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
                    value={editedModel.physical?.hairColor || ""}
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
                <p>Height: {model.physical?.height} cm</p>
                <p>Hair: {model.physical?.hairColor}</p>
              </>
            )}

            {!isEditing && <h6>Skills</h6>}
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
            <Button
              variant="warning"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => onDelete(model.id)}
            >
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

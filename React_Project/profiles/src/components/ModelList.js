import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, Row, Col, Badge } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import ModelModal from "./ModelModal";


function ModelList() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    const snapshot = await getDocs(collection(db, "model_db"));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setModels(data);
  };
  const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(db, "model_db", id)); // delete from Firestore
    setModels(models.filter((m) => m.id !== id)); // remove from state
    setSelectedModel(null); // close modal if open
  } catch (error) {
    console.error("Error deleting model:", error);
  }
};


  return (
    <>
      <Row>
        {models.map(model => (
          <Col md={4} lg={3} sm={6} xs={12} key={model.id} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedModel(model)}
            >
              {model.images?.length > 0 && (
                <Card.Img
                  src={model.images[0]}
                  style={{ height: 250, objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{model.name}</Card.Title>

                <Badge bg="dark">{model.type}</Badge>

                <ReactStars
                  count={5}
                  value={model.rating || 0}
                  edit={false}
                  size={20}
                  isHalf
                />

                <div className="mt-2">
                  {model.skills?.specialSkills?.map((skill, i) => (
                    <Badge key={i} bg="secondary" className="me-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedModel && (
        <ModelModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
          onDelete={handleDelete}
          refreshModels={fetchModels}
        />
      )}
    </>
  );
}

export default ModelList;

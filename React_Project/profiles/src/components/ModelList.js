import { useEffect, useState } from "react";
import axios from "axios";
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
    try {
      const res = await axios.get("http://localhost:4000/models");
      setModels(res.data);
    } catch (err) {
      console.error("Error fetching models:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this model?")) return;
    try {
      await axios.delete(`http://localhost:4000/models/${id}`);
      setSelectedModel(null);
      fetchModels();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <>
      <Row>
        {models.map((model) => (
          <Col md={4} lg={3} sm={6} xs={12} key={model.id} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{ cursor: "pointer", borderRadius: "10px" }}
              onClick={() => setSelectedModel(model)}
            >
              {/* Model Image */}
              {model.images?.length > 0 && (
                <Card.Img
                  variant="top"
                  src={model.images[0]}
                  style={{ height: 250, objectFit: "cover", borderRadius: "10px" }}
                />
              )}

              <Card.Body>
                {/* Name */}
                <Card.Title>{model.name}</Card.Title>

                {/* Model Type */}
                <Card.Text>
                  <strong>Type:</strong> {model.type || "Fashion"}
                </Card.Text>

                {/* Star Rating */}
                <ReactStars
                  count={5}
                  value={model.rating || 0}
                  size={20}
                  isHalf={true}
                  edit={false}
                  activeColor="#ffd700"
                />

                {/* Skills */}
                <div className="d-flex flex-wrap gap-1 mt-2">
                  {model.skills?.specialSkills?.map((skill, i) => (
                    <Badge bg="secondary" key={i}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for full profile */}
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

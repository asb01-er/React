import { useState } from "react";
import axios from "axios";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


// Cloudinary config
const CLOUD_NAME = "dan24q0ck";
const UPLOAD_PRESET = "Images";

// Upload single image to Cloudinary
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );

  return res.data.secure_url;
};

function AddModel() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Single");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [clothingSize, setClothingSize] = useState("");

  const [employment, setEmployment] = useState("");
  const [experience, setExperience] = useState("");
  const [agencies, setAgencies] = useState("");
  const [categories, setCategories] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");

  const [hobbies, setHobbies] = useState("");
  const [specialSkills, setSpecialSkills] = useState("");
  const [languages, setLanguages] = useState("");

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || images.length === 0) {
      alert("Name and at least one image are required");
      return;
    }

    try {
      // 1️⃣ Upload images to Cloudinary
      const uploadedImages = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadImage(images[i]);
        uploadedImages.push(url);
      }

      // 2️⃣ Prepare JSON to match backend schema
      const userData = {
        name,
        status,
        age: Number(age),
        gender,
        nationality,
        contact: { email: contactEmail, phone: contactPhone },
        physical: {
          height: Number(height),
          weight: Number(weight),
          bust: Number(bust),
          waist: Number(waist),
          hips: Number(hips),
          hairColor,
          eyeColor,
          shoeSize: Number(shoeSize),
          clothingSize,
        },
        professional: {
          employment,
          experience,
          agencies: agencies ? agencies.split(",").map((a) => a.trim()) : [],
          categories: categories ? categories.split(",").map((c) => c.trim()) : [],
          portfolioLinks: portfolioLinks ? portfolioLinks.split(",").map((p) => p.trim()) : [],
        },
        skills: {
          hobbies: hobbies ? hobbies.split(",").map((h) => h.trim()) : [],
          specialSkills: specialSkills ? specialSkills.split(",").map((s) => s.trim()) : [],
          languages: languages ? languages.split(",").map((l) => l.trim()) : [],
        },
        images: uploadedImages,
      };

      await addDoc(collection(db, "model_db"), {
        ...userData,
        rating: 0,
        type: "Fashion",
        createdAt: serverTimestamp(),
      });

      alert("Model profile added successfully!");
      history.push("/");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  // const clearForm = () => {
  //   setName("");
  //   setStatus("Single");
  //   setAge("");
  //   setGender("");
  //   setNationality("");
  //   setContactEmail("");
  //   setContactPhone("");
  //   setHeight(""); setWeight(""); setBust(""); setWaist(""); setHips("");
  //   setHairColor(""); setEyeColor(""); setShoeSize(""); setClothingSize("");
  //   setEmployment(""); setExperience(""); setAgencies(""); setCategories(""); setPortfolioLinks("");
  //   setHobbies(""); setSpecialSkills(""); setLanguages("");
  //   setImages([]);
  //   setImagePreviews([]);
  // };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Add Model Profile</h2>
      <Card className="p-3">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-2">
            <Col>
              <Form.Control placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </Col>
            <Col>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Single">Single</option>
                <option value="Taken">Taken</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col><Form.Control type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} /></Col>
          </Row>

          <Row className="mb-2">
            <Col><Form.Control placeholder="Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} /></Col>
          </Row>

          <Row className="mb-2">
            <Col><Form.Control placeholder="Phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} /></Col>
            <Col>
              <Form.Control type="file" multiple accept="image/*" onChange={handleImageChange} />
              {imagePreviews.map((src, i) => (
                <img key={i} src={src} alt="preview" style={{ height: 80, marginRight: 5, marginTop: 5 }} />
              ))}
            </Col>
          </Row>

          {/* Physical Attributes */}
          <h5>Physical Attributes</h5>
          <Row className="mb-2">
            <Col><Form.Control placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Bust (cm)" value={bust} onChange={(e) => setBust(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Waist (cm)" value={waist} onChange={(e) => setWaist(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Hips (cm)" value={hips} onChange={(e) => setHips(e.target.value)} /></Col>
          </Row>

          <Row className="mb-2">
            <Col><Form.Control placeholder="Hair Color" value={hairColor} onChange={(e) => setHairColor(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Eye Color" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Shoe Size" value={shoeSize} onChange={(e) => setShoeSize(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Clothing Size" value={clothingSize} onChange={(e) => setClothingSize(e.target.value)} /></Col>
          </Row>

          {/* Professional Info */}
          <h5>Professional Info</h5>
          <Row className="mb-2">
            <Col><Form.Control placeholder="Employment" value={employment} onChange={(e) => setEmployment(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Experience Level" value={experience} onChange={(e) => setExperience(e.target.value)} /></Col>
          </Row>
          <Row className="mb-2">
            <Col><Form.Control placeholder="Agencies (comma-separated)" value={agencies} onChange={(e) => setAgencies(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Categories (comma-separated)" value={categories} onChange={(e) => setCategories(e.target.value)} /></Col>
          </Row>
          <Row className="mb-2">
            <Col><Form.Control placeholder="Portfolio Links (comma-separated)" value={portfolioLinks} onChange={(e) => setPortfolioLinks(e.target.value)} /></Col>
          </Row>

          {/* Skills */}
          <h5>Skills & Interests</h5>
          <Row className="mb-2">
            <Col><Form.Control placeholder="Hobbies (comma-separated)" value={hobbies} onChange={(e) => setHobbies(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Special Skills (comma-separated)" value={specialSkills} onChange={(e) => setSpecialSkills(e.target.value)} /></Col>
            <Col><Form.Control placeholder="Languages (comma-separated)" value={languages} onChange={(e) => setLanguages(e.target.value)} /></Col>
          </Row>

          <Button variant="primary" type="submit">Add Model Profile</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddModel;

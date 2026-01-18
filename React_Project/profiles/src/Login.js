import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./components/auth";
import { useHistory } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <h3 className="text-center">Admin Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Control
            className="mb-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-100">Login</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;

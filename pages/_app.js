import "./_app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function MyApp({Component, pageProps}) {
  return <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Welcome</Navbar.Brand>
        <Navbar id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/palette">Add Palette</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
    <Container><Component {...pageProps} /></Container>
  </>
    ;
}

export default MyApp;

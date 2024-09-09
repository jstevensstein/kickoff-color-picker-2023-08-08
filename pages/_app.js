import "./_app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function MyApp({Component, pageProps}) {
  return <>
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Welcome</Navbar.Brand>
        <Navbar>
          <Nav.Link href="/palette">Add Palette</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
        </Navbar>
      </Container>
    </Navbar>
    <Container><Component {...pageProps} /></Container>
  </>;
}

export default MyApp;

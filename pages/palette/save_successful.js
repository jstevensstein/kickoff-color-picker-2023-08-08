import { ListGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

// this is just an example
// feel free to use class based components and whatever paradigms you're most comfortable with
const SaveSuccessful = () => {
  return <>
    <h2>Palette successfully saved!</h2>
    <Button href="/palette" variant="success">Add another?</Button>
  </>
}

export default SaveSuccessful;
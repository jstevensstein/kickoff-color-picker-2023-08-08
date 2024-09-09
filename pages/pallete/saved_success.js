import { ListGroup, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

// this is just an example
// feel free to use class based components and whatever paradigms you're most comfortable with
const SavedSuccess = () => {
  return <>
    <h2>Pallete successfully saved!</h2>
    <Button href="/pallete" variant="success">Add another?</Button>
  </>
}

export default SavedSuccess;
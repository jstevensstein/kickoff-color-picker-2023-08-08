import { useRouter } from 'next/router';
import Palette from "../../components/palette";
import EditPalette from "../../components/palette/editPalette";

const EditPaletteView = () => {
  const router = useRouter();
  const {id} = router.query;
  return (
    id ?
      <EditPalette id={id}></EditPalette>
      : null
  );
};

export default EditPaletteView;
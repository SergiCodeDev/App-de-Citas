import User from "@/models/User";
import { connectToDB } from "@/mongodb";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const PUT = async (req, { params }) => {
  try {
    await connectToDB();

    const { userId } = params;

    // Acceder directamente al FormData desde req
    const formData = await req.formData();

    // Extraer los campos del formulario
    const usuario = formData.get('usuario');
    let edad;
    if (formData.get('edad')=="null"){
      edad=null;
    }else{
      edad = formData.get('edad');
    }
    
    const ciudad = formData.get('ciudad');
    const descripcion = formData.get('descripcion');

    const file2 = formData.get('fotoDePerfil');
    console.error(usuario, edad, ciudad, descripcion, file2)

    let updateFields = {
      username: usuario,
      age: edad,
      location: ciudad,
      bio: descripcion
    };

    // Obtener el usuario actual
    const user = await User.findById(userId);

    // Guardar la nueva imagen de perfil si se ha enviado
    let nuevaImagenGuardada = false;
    let imagePathAnterior = null;

    if (formData.has('fotoDePerfil')) {
      const file = formData.get('fotoDePerfil');

      // Validar el tipo y tamaño del archivo
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        return new Response("Sólo se permiten archivos JPEG y PNG.", { status: 400 });
      }
      if (file.size > 2 * 1024 * 1024) {
        return new Response("El tamaño del archivo supera los 2 MB.", { status: 400 });
      }

      // Leer el contenido del archivo y guardar en la carpeta public
      const extension = file.type === 'image/jpeg' ? 'jpg' : 'png';
      const imageName = `${uuidv4()}-${Date.now()}.${extension}`;
      const imagePath = path.join(process.cwd(), 'public', 'pictures', imageName);
      const imageBuffer = await file.arrayBuffer(); // Convertir a ArrayBuffer

      // Crea el directorio si no existe
      const picturesDir = path.join(process.cwd(), 'public', 'pictures');
      if (!fs.existsSync(picturesDir)) {
        fs.mkdirSync(picturesDir, { recursive: true });
      }

      try {
        fs.writeFileSync(imagePath, Buffer.from(imageBuffer));
        updateFields.profileImage = `/pictures/${imageName}`; // Ruta relativa al archivo en la carpeta 'public'
        nuevaImagenGuardada = true;
      } catch (error) {
        console.error('Error al guardar la nueva imagen', error);
        return new Response("Error al guardar la nueva imagen", { status: 500 });
      }
    }

    // Si se ha guardado la nueva imagen, eliminar la imagen anterior si existe
    if (nuevaImagenGuardada && user.profileImage) {
      // Construir la ruta completa de la imagen anterior
      imagePathAnterior = path.join(process.cwd(), 'public', user.profileImage.replace('/public/', ''));

      // Eliminar la imagen anterior
      try {
        if (fs.existsSync(imagePathAnterior)) {
          fs.unlinkSync(imagePathAnterior);
          console.log(`Imagen anterior eliminada: ${imagePathAnterior}`);
        }
      } catch (error) {
        console.error('Error al eliminar la imagen anterior', error);
        return new Response("Error al eliminar la imagen anterior", { status: 500 });
      }
    }

    // Filtrar campos vacíos o undefined antes de la actualización
    Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);

    // Actualizar el usuario con los nuevos campos incluyendo la nueva imagen de perfil
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true }
    );

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error al actualizar el usuario", { status: 500 });
  }
};

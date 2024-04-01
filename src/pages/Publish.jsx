import axios from "axios";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Navigate } from "react-router-dom";

// je dois gerer le cas ou quelqun tape l'url directement

const Publish = ({ token }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
    picture: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      picture: file,
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const [pictureFromCloudinary, setPictureFromCloudinary] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setPictureFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  console.log(token);
  return !token ? (
    <Navigate to={"/"} />
  ) : (
    <main>
      <div className="container">
        <div>
          {pictureFromCloudinary && <img src={pictureFromCloudinary} alt="" />}
          <form onSubmit={handleSubmit}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
                Glissez-déposez votre image ici, ou cliquez pour sélectionner un
                fichier
              </p>
            </div>

            <div>
              <div>
                <p>Titre</p>
                <input
                  type="text"
                  name="title"
                  placeholder="ex: chemise Sézane verte"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Décris ton article</p>
                <input
                  type="text"
                  name="description"
                  placeholder="ex: porté quelquefois, taille correctement"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <p>Marque</p>
                <input
                  type="text"
                  name="brand"
                  placeholder="ex:Zara"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Taille</p>
                <input
                  type="text"
                  name="size"
                  placeholder="ex: L/ 40 / 12"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Couleur</p>
                <input
                  type="text"
                  name="color"
                  placeholder="ex: Fushia"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p>Etat</p>
                <input
                  type="text"
                  name="condition"
                  placeholder="ex: Neuf avec étiquette"
                  value={formData.condition}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>Lieu</p>
                <input
                  type="text"
                  name="city"
                  placeholder="ex: Paris"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>Prix</p>
                <input
                  type="text"
                  name="price"
                  placeholder="0,00 €"
                  value={formData.price}
                  onChange={handleChange}
                />
                <div>
                  <input type="checkbox" />
                  <p>je suis intéressé(e) par les échanges</p>
                </div>
              </div>
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Publish;

import axios from "axios";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token, setLoginModal, loginModal }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
    pictures: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const previewPictures = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: prevFormData.pictures.concat(previewPictures),
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("condition", formData.condition);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("color", formData.color);

    for (let i = 0; i < formData.pictures.length; i++) {
      formDataToSend.append("picture", formData.pictures[i].file);
    }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.data._id) {
        navigate(`/offers/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return !token ? (
    <>
      <Navigate to={"/"} />
      {setLoginModal(!loginModal)}
    </>
  ) : (
    <main className="main-publish">
      <div className="container">
        <div>
          <h1>Vends ton article</h1>

          <form onSubmit={handleSubmit}>
            <div className="select-picture">
              <div {...getRootProps()} className="picture-zone">
                <input {...getInputProps()} />
                {formData.pictures && formData.pictures.length > 0 ? (
                  formData.pictures.map((pictureObj, index) => (
                    <img
                      key={index}
                      src={pictureObj.preview}
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                    />
                  ))
                ) : (
                  <p>
                    Glissez-déposez votre image ici, ou cliquez pour
                    sélectionner un fichier
                  </p>
                )}
              </div>
            </div>

            <div className="first-zone">
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
            <div className="second-zone">
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
            </div>
            <div className="third-zone">
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
            <div className="add-button">
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Publish;

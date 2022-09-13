import React from "react";
import "./gallery.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import PhotoAlbum from "react-photo-album";
import { photos } from "./photos";

const Gallery = () => {
  return (
    <div className="gallery">
      <Sidebar />
      <div className="galleryContainer">
        <Navbar />
        <PhotoAlbum
          layout="masonry"
          spacing={23}
          padding={6}
          width="75%"
          columns={6}
          photos={photos}
        />
      </div>
    </div>
  );
};

export default Gallery;

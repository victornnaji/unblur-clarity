import React from "react";
import PhotoPreviewer from "./PhotoPreviewer";

const PreviewContainer = () => {
  return (
    <div className="rounded-lg shadow-md lg:px-6 h-full">
      <section className="preview">
        <PhotoPreviewer />
      </section>
    </div>
  );
};

export default PreviewContainer;

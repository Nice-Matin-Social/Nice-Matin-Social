import React, { useState, useCallback } from "react";
import clsx from "clsx";
import ImageSlides from "react-imageslides";
import { Backdrop } from "@mui/material";

export default function MediaGrid(props) {
  const files = JSON.parse(props.files);
  const [imageSlide, setImageSlide] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = files.map((url) => {
    return `https://dogefiles.twetch.app/${url}`;
  });
  
  const openImage = useCallback((e, url) => {
    e.preventDefault();
    e.stopPropagation();
    setImageSlide(url);
    setOpen(true);
  }, []);

  const handleChange = useCallback((newIndex) => {
    setActiveIndex(newIndex);
  }, []);

  if (!files.length) {
    return null;
  }

  return (
    <div>
      <ul
        className={clsx(
          "twetch-renderer__media-grid",
          files.length > 1 && "twetch-renderer__media-grid--multi",
          files.length % 2 === 1 && "twetch-renderer__media-grid--odd"
        )}
      >
        {images.map((url, index) => {
          return (
            <li key={index} className="twetch-renderer__media-grid-item">
              {images.length > 1 ? (
                <div
                  style={{
                    backgroundImage: `url(${url})`
                  }}
                  onClick={(e) => openImage(e, url)}
                />
              ) : (
                <img src={url} onClick={(e) => openImage(e, url)} />
              )}
            </li>
          );
        })}
      </ul>

      {imageSlide && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          sx={{ zIndex: 1001 }}
        >
          <ImageSlides
            index={images.findIndex((url) => url === imageSlide)}
            tapClose={true}
            images={images}
            isOpen={open}
            showPageButton={true}
          />
        </div>
      )}
    </div>
  );
}

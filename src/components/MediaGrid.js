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
  const images1 = [
    "http://dingyue.nosdn.127.net/0UDLpU6BsCNm9v9OpT0Dhn=nHKJFC6SMByz8bMWxFM=1t1531988836046compressflag.jpeg",
    "http://dingyue.nosdn.127.net/9sFTTWDQoHjxyIkU9wzm8CiDNVbq48Mwf2hyhgRghxA5O1527909480497compressflag.jpeg",
    "http://dingyue.nosdn.127.net/eSJPDtcP9NBvEOIMPyPLxwpJSZIu4D36qDss2RGQjNHBp1531990042001compressflag.jpeg",
    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503235534249&di=4c198d5a305627d12e5dae4c581c9e57&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2Fanime%2F0529%2F0529-17277.jpg"
  ];
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
          {/* <div>
            <button
              className="twetch-renderer__media-grid-close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setImageSlide("");
                setOpen(false);
              }}
            >
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
            </button>
          </div> */}
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

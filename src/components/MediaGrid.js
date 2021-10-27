import { useTheme } from "@emotion/react";
import { ImageList, ImageListItem } from "@mui/material";
import React from "react";

export default function MediaGrid(props) {
  const theme = useTheme();
  const files = JSON.parse(props.files);
  switch (files.length) {
    case 1:
      return (
        <div
          style={{
            maxHeight: "273.938px",
            width: "100%",
            marginTop: "8px"
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              margin: "0 auto",
              border: theme.palette.divider,
              display: "flex",
              overflow: "hidden",
              animation: "jss889 8s ease-in-out infinite",
              maxHeight: "100vh",
              alignItems: "center",
              borderRadius: "6px",
              backgroundSize: "400% 100%",
              backgroundImage:
                "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
            }}
          >
            <img
              src={`https://dogefiles.twetch.app/${files[0]}`}
              alt={`img ${files[0]}`}
              style={{
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url("https://dogefiles.twetch.app/${files[0]}")`
              }}
            />
          </div>
        </div>
      );
    case 2:
      return (
        <ImageList sx={{ marginTop: "8px" }} cols={2} rowHeight="202px">
          {files.map((f) => {
            return (
              <ImageListItem
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "0 auto",
                  border: theme.palette.divider,
                  display: "flex",
                  overflow: "hidden",
                  animation: "jss889 8s ease-in-out infinite",
                  maxHeight: "100vh",
                  alignItems: "center",
                  borderRadius: "6px",
                  backgroundSize: "400% 100%",
                  backgroundImage:
                    "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                }}
                key={`img_${f}`}
              >
                <img
                  src={`https://dogefiles.twetch.app/${f}`}
                  alt={`img ${f}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      );

    case 3:
      return (
        <div
          style={{
            width: "100%",
            marginTop: "8px",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <div style={{ width: "100%" }}>
            <ImageList cols={1} style={{ margin: "-1px" }}>
              <ImageListItem
                style={{
                  height: "204px",
                  width: "100%",
                  padding: "1px"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: theme.palette.divider,
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    src={`https://dogefiles.twetch.app/${files[0]}`}
                    alt={`img ${files[0]}`}
                    style={{
                      width: "100%",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"
                    }}
                  />
                </div>
              </ImageListItem>
            </ImageList>
          </div>
          <div style={{ width: "100%", marginLeft: "2px" }}>
            <ImageList style={{ margin: "-1px" }} cols={1}>
              {files.map((f, index) => {
                if (index === 0) {
                  return null;
                } else {
                  return (
                    <ImageListItem
                      style={{
                        height: "100px",
                        width: "100%",
                        margin: "0 auto",
                        border: `1px solid ${theme.palette.divider}`,
                        overflow: "hidden",
                        animation: "jss889 8s ease-in-out infinite",
                        maxHeight: "100vh",
                        alignItems: "center",
                        borderRadius: "6px",
                        backgroundSize: "400% 100%",
                        backgroundImage:
                          "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                      }}
                      key={`img_${f}`}
                    >
                      <img
                        src={`https://dogefiles.twetch.app/${f}`}
                        alt={`img ${f}`}
                        style={{
                          height: "100%",
                          borderRadius: "6px",
                          backgroundSize: "400% 100%",
                          backgroundImage:
                            "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                        }}
                      />
                    </ImageListItem>
                  );
                }
              })}
            </ImageList>
          </div>
        </div>
      );
    case 4:
      return (
        <ImageList
          sx={{ width: "100%", height: "238px" }}
          cols={2}
          rowHeight="128px"
        >
          {files.map((f) => {
            return (
              <ImageListItem
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "0 auto",
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: "hidden",
                  animation: "jss889 8s ease-in-out infinite",
                  maxHeight: "100vh",
                  alignItems: "center",
                  borderRadius: "6px",
                  backgroundSize: "400% 100%",
                  backgroundImage:
                    "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                }}
                key={`img_${f}`}
              >
                <img
                  src={`https://dogefiles.twetch.app/${f}`}
                  alt={`img ${f}`}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      );
    default:
      return null;
  }

  /* else if (files.length === 3) {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <GridList style={{ margin: "-1px" }}>
            <GridListTile
              style={{
                width: "100%",
                height: "204px",
                padding: "1px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${files[0]}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${files[0]}`}
                  />
                </div>
              </div>
            </GridListTile>
          </GridList>
        </div>
        <div style={{ width: "50%", marginLeft: "1px" }}>
          <GridList style={{ margin: "-1px" }}>
            <GridListTile
              style={{
                width: "100%",
                height: "102px",
                padding: "1px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${files[1]}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${files[1]}`}
                  />
                </div>
              </div>
            </GridListTile>
            <GridListTile
              style={{
                width: "100%",
                height: "102px",
                padding: "1px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${files[2]}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${files[2]}`}
                  />
                </div>
              </div>
            </GridListTile>
          </GridList>
        </div>
      </div>
    );
  } else {
    return (
      <GridList style={{ margin: "-1px" }}>
        {files.map((file, index) => {
          return (
            <GridListTile
              style={{
                width: "50%",
                height: "102px",
                padding: "1px"
              }}
              key={index}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    border: "1px solid #262629",
                    display: "flex",
                    overflow: "hidden",
                    animation: "jss889 8s ease-in-out infinite",
                    maxHeight: "100vh",
                    alignItems: "center",
                    borderRadius: "6px",
                    backgroundSize: "400% 100%",
                    backgroundImage:
                      "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                  }}
                >
                  <img
                    alt={`pxl #${file}`}
                    style={{
                      width: "100%",
                      cursor: "pointer",
                      display: "block",
                      animation: "jss494 8s ease-in-out infinite",
                      borderRadius: "6px",
                      backgroundSize: "400% 100%",
                      backgroundImage:
                        "linear-gradient(270deg, #3F3F41, #1A1A1C, #3F3F41, #1A1A1C)"
                    }}
                    src={`https://dogefiles.twetch.app/${file}`}
                  />
                </div>
              </div>
            </GridListTile>
          );
        })}
      </GridList>
    );
  } */
}

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Stack,
  useMediaQuery,
  useTheme,
  Grid,
  CardActions,
  Avatar,
  CardActionArea,
  AppBar,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import { Key } from "./key";
import moment from "moment";
import ShareIcon from "@mui/icons-material/Share";
import "./App.css";
import news from "./assets/news.png";
function App() {
  const [data, setData] = useState([]);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [categorytext, setCategorytext] = useState("India");
  const [isloading, setIsloading] = useState(true);
  const [selectedindex, setSelectedindex] = useState(0);
  const categories = [
    "Business",
    "Entertainment",
    "LifeStyle",
    "Politics",
    "ScienceAndTechnology",
    "Sports",
    "World",
  ];
  useEffect(() => {
    const newsfetching = async () => {
      const options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: {
          cc: "IN",
          category: categorytext,
          safeSearch: "Off",
          textFormat: "Raw",
        },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":Key,
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setData(response.data.value);
        setIsloading(false);
        console.log(response.data.value);
      } catch (error) {
        console.error(error);
      }
    };
    newsfetching();
  }, [categorytext]);
  return (
    <>
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding:mobile?0.5:1,
          backgroundColor: "#FFFBFF",
        }}
      >
        <Avatar src={news} />
        <Typography
          variant={mobile ? "h5" : "h4"}
          sx={{ textAlign: mobile ? "start" : "center", color: "#457EAC" }}
        >
          BingNews
        </Typography>
      </AppBar>
      {isloading ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: mobile ? "46%" : "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ) : (
        <Container sx={{ marginBlockStart: 12 }}>
          <Box
            sx={{
              display: "flex",
              overflow:"auto",
              gap:1,
              alignItems: "center",
              whiteSpace:'nowrap',
              justifyContent:mobile?'start':"center",
              marginBlockEnd: 5,
            }}
            id="scroll-bar"
          >
            {categories.map((category, index) => {
              return (
                <Button
                  key={index}
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize:10,
                    overflow:'hidden',
                    minWidth:mobile?'8.9rem':'',
                  }}
                  size={mobile?'small':"medium"}
                  id={index === selectedindex ? "clicked" : "none"}
                  onClick={(e) => {
                    setCategorytext(e.target.textContent);
                    setIsloading(true);
                    setSelectedindex(index);
                  }}
                >
                  {category}
                </Button>
              );
            })}
          </Box>
          <Grid container spacing={2}>
            {data.map(
              (
                { name, url, datePublished, image, description, provider },
                index
              ) => {
                return (
                  <Grid item key={index} xs={12} md={3} lg={4}>
                    <Card>
                      <CardActionArea component="a" href={url}>
                        <CardMedia
                        component="img"
                        alt=""
                         image={
                            image?.thumbnail.contentUrl ??
                            provider[0].image.thumbnail.contentUrl
                          }
                          sx={{
                            width:image?.thumbnail.contentUrl.width,
                            height:image?.thumbnail.contentUrl.height
                          }}
                
                        />

                        <CardContent>
                          <Typography variant="h6" id="name">
                            {name}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="start"
                            id="desc"
                          >
                            {description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          gap={0.4}
                        >
                          <Avatar
                            src={provider[0]?.image?.thumbnail.contentUrl}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {provider[0].name}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          gap={0.4}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <IconButton
                            onClick={async () => {
                              await navigator.share({ url: url });
                            }}
                          >
                            <ShareIcon />
                          </IconButton>
                          <Typography
                            variant="body2"
                            sx={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {moment(datePublished, "YYYYMMDD").fromNow()}
                          </Typography>
                        </Stack>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Container>
      )}
    </>
  );
}

export default App;

import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: "AIzaSyAU-_FBkmp1yRR1Nn7ES5qnqU6dGopRiVo",
  },
});

export default request;

import axios from "axios";

const BASE_URL = "http://192.168.100.238:1337/api";

const API_KEY =
  "7468232a07511c16817b9a71665d7e48821294757a7f8f6ebc1803cac31dcf7b95acf9614fb50ae524031610f8c13f514039c16cfe2a475a494b41ddb0266cfa2cd5b3ceb47a9ed19a237032a81a26c5f8c83a7763b10c5ca63c0d625002e8bfae94742ba944c7d7455bfc047b2a64d77b32856d4b619fa84755e93be30c81ac";

const AxioInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer" + API_KEY,
  },
});

const getSlider = () => AxioInstance.get("/sliders?populate=*");

const getCategories = () => AxioInstance.get("/categories?populate=*");

const getPremiumMentors = () => AxioInstance.get("/mentors?filters[Premium][$eq]=true&populate=*");

const getMentors = () => AxioInstance.get("/hospitals?filters[Premium][$eq]=true&populate=*");

const getMentorsByCategory=(category)=> AxioInstance.get("hospitals?filters[categories][Name][$in]="+category+"&populate=*");

const getExersizes=()=> AxioInstance.get("/exersizes?populate=*");

const getExersizeList=(exersize)=> AxioInstance.get("/exersize-list-screens?filters[exersizes][Name][$notIn]="+exersize+"&populate=*");

const getExersizeDescription=(exersize)=> AxioInstance.get("/exersize-list-screens?filters[exersizes][Name][$in]="+exersize+"&populate=*");



const createAppointment=(data)=>AxioInstance.post(
  "/appointments",data
);

const getAllHospital=()=>AxioInstance.get("hospitals?populate=*");

const getUserAppointments=(email)=> AxioInstance.get("appointments?filters[email][$eq]="+email+"&populate=*");



export default {
  getSlider,
  getCategories,
  getPremiumMentors,
  getMentors,
  getMentorsByCategory,
  getExersizes,
  getExersizeList,
  createAppointment,
  getAllHospital,
  getUserAppointments,
  getExersizeDescription
};

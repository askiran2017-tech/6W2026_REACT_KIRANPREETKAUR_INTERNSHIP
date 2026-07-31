import axios from "axios";
const CloudName="psj15wto"
const upload_preset="Student_profile"
const uploadUrl= "https://api.cloudinary.com/v1_1/psj15wto/image/upload";

class CloudinaryServices{
    async upload(profileImage){
        const formData=new FormData()
        formData.append("file", profileImage);
        formData.append('upload_preset',upload_preset)
        const result=await axios.post(uploadUrl,formData);
        console.log(result.data);
        return result.data.secure_url
     }
     
}
export default new CloudinaryServices
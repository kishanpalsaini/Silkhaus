import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export {}


// const successToaster = (data) => toast.success(data);
// const errorToaster = (data) => toast.error(data);

export const getRequest = async (url) => {
    // console.log("process.env.BASEURLCUSTOM :", process.env.REACT_APP_API_URL)
    try {
        const response = await axios.get(url);
        console.log(response);
        // successToaster("success")
        return response.data;
      } catch (error) {
        console.log(error.message)
        debugger
        // errorToaster(error?.message || "error")
        console.error(error);
      }
}


// export const postRequest = async (postURL, postData) => {
//     console.log("process.env.BASEURLCUSTOM :", process.env.REACT_APP_API_URL)
//     try {
//         const response = await axios({
//             method: 'post',
//             url: `${process.env.REACT_APP_API_URL}${postURL}`,
//             data: postData,
//             // data: {
//             //   firstName: 'Fred',
//             //   lastName: 'Flintstone'
//             // }
//           });
//           successToaster("success !")
//         console.log(response);
//         return response.data;
//       } catch (error) {
//         errorToaster(error)
//         console.error(error);
//       }
// }


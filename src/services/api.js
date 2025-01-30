import axios from 'axios';
import { API_CONSTANTS } from "../assets/config/constant"


import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',

  }
}



function getBaseUrl() {
  return API_CONSTANTS.BASE_URL;
}

function getToken() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then(token => {
      resolve(token)
    })
  });
}

async function registerUser(userData) {
  try {
    const baseUrl = await getBaseUrl();
    const response = await axios.post(baseUrl + API_CONSTANTS.merchantUser, userData);
    
    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {
    
    return { success: false, error, data: 'Some Error occurred!' };
  }
}



async function callAxios(endPoint, reqData, auth = true) {
  
  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);

    const authtoken = auth ? 'Bearer ' + token : "";

    const response = await axios.post(
      baseUrl + endPoint,
      
      { ...reqData },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authtoken
        }
      },

    );
   
    if (response.data.access_token) {
      return { success: true, data: response.data, message: response.data.message };
    } if (response.data.aaData) {
      return { success: true, data: response.data };
    } else if (response.data.status === "success") {
      return { success: true, data: response.data, message: response.data.message };
    } else {
      return { success: true, data: response.data, message: response.data.message };
    }
  } catch (error) {

   
    return {

      success: false,
      data: {
        message: 'Some Error occurred!',
        error: error.response
      }
    };
  }
}
async function callAxiosWithFormData(endPoint, reqData,auth = true) {
 
  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);
    const authtoken = auth ? 'Bearer ' + token : "";
      


    const response = await axios.post(
      baseUrl + endPoint,
      reqData,
 
      {
        headers: {
         
          'Accept':'*/*',
          'Content-Type':'multipart/form-data',
          'Authorization': authtoken,
          'accept-encoding': 'gzip, deflate, br',
          
          
        }
        
      }
    );



    if (response.data.access_token) {
      return { success: true, data: response.data, message: response.data.message };
    } else if (response.data.aaData) {
      return { success: true, data: response.data };
    } else if (response.data.status === "success") {
      return { success: true, data: response.data, message: response.data.message };
    } else {
      return { success: false, data: response.data, message: response.data.message };
    }
  } catch (error) {
    return {
      success: false,
      data: {
        message: 'Some Error occurred!',
        error: error.response,
        error:error.message
      }
    };
  }
}
async function callAxiosWithFormDataRegister(endPoint, reqData) {
  try {
    const [baseUrl] = await Promise.all([getBaseUrl()]);
 



    const response = await axios.post(
      baseUrl + endPoint,
      reqData,
 
      {
        headers: {
         
          'Accept':'*/*',
          'Content-Type':'multipart/form-data',
          'accept-encoding': 'gzip, deflate, br',
          
          
        }
        
      }
    );



    if (response.data.access_token) {
      return { success: true, data: response.data, message: response.data.message };
    } else if (response.data.aaData) {
      return { success: true, data: response.data };
    } else if (response.data.status === "success") {
      return { success: true, data: response.data, message: response.data.message };
    } else {
      return { success: false, data: response.data, message: response.data.message };
    }
  } catch (error) {
    return {
      success: false,
      data: {
        message: error.message,
        error: error,
        errorme:error.message
        // error:error.message
      }
    };
  }
}



async function callAxiosGet(endPoint, auth = true) {
  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);

    const authtoken = auth ? 'Bearer ' + token : "";

    const response = await axios.get(
      baseUrl + endPoint,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authtoken
        }
      }
    );

    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {

    return {
      success: false, data: {
        message: 'Some Error occurred!',
        error: error
      }
    };
  }
}

async function callAxiosWithoutSession(endPoint, reqData) {
  try {
    const baseUrl = await getBaseUrl();

    const response = await axios.post(
      baseUrl + endPoint,
      { ...reqData },
      axiosRequestConfig
    );

    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {

    return { success: false, data: 'Some Error occurred!' };
  }
}

async function callAxiosGetWithoutSession(endPoint) {
  try {
    const baseUrl = await getBaseUrl();

    const response = await axios.get(
      baseUrl + endPoint
    );

    if (response.data.status === "success") {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {

    return { success: false, data: 'Some Error occurred!' };
  }
}
async function callAxiosPaymet(reqData) {
  
  try {
    const baseUrl = await getBaseUrl();

    const response = await axios.post(
      baseUrl, 
      reqData,  // Corrected the way reqData is passed
      {
        headers: {
          'Content-Type': 'application/json',
          
        }
      }
    );

    if (response.data.status === "success") {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {
    console.error("Error in callAxiosPaymet:", error.response ? error.response.data : error.message);
    return { success: false, data: 'Some Error occurred!' };
  }
  
}
async function callAxiosPatch(endPoint, reqData, auth = true) {
  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);
    const authtoken = auth ? 'Bearer ' + token : "";

    const response = await axios.patch(
      baseUrl + endPoint,
      { reqData },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authtoken
        }
      },
    );

    if (response.data.access_token) {
      return { success: true, data: response.data, message: response.data.message };
    } else if (response.data.aaData) {
      return { success: true, data: response.data };
    } else if (response.data.status === "success") {
      return { success: true, data: response.data, message: response.data.message };
    } else {
      return { success: false, data: response.data, message: response.data.message };
    }
  } catch (error) {
    return {
      success: false,
      data: {
        message: 'Some Error occurred!',
        error: error.response
      }
    };
  }
}

export {
  callAxios,
  registerUser,
  callAxiosGet,
  callAxiosPaymet,
  callAxiosPatch,
  callAxiosWithFormData,
  callAxiosWithoutSession,
  callAxiosGetWithoutSession,
  callAxiosWithFormDataRegister
};

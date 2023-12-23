import axios from "axios";
export const checkifverify = async (mail) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/checkifverify`, {
      mail
    }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}

export const checkotpv = async (mail, otp) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/checkotpv`, {
      mail,
      otp
    }
    )
    return data;
  } catch (error) {
    return { msg: "error in sending mail" };
  }
}
export const sendmail = async (mail, name) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/sendmail`, {
      mail,
      name
    }
    )
    return data;
  } catch (error) {
    return { msg: "error in sending mail" };
  }
}


export const fetchprof = async (id) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/fetchprof`,
      {
        id,
      }
    )
    // data = [...data, { msg: "ok" }];
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
export const fetchphone = async (id) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/fetchphone`,
      {
        id,
      }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
export const addCart = async (id1, id2) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/addcart`,
      {
        id1,
        id2
      }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
export const clearCart = async (id1) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/clearcart`,
      {
        id1,
      }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
export const removeitem = async (id1, id2) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/removeitem`,
      {
        id1,
        id2,
      }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
export const decreaseitem = async (id1, id2) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/decreaseitem`,
      {
        id1,
        id2,
      }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
export const editdetailsuser = async (id, phone, address) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/editdetailsuser`,
      {
        id, phone, address,
      }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
export const sendcart = async (id) => {
  try {
    const data = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/sendcart`,
      {
        id
      }
    )
    return data;
  } catch (error) {
    return { msg: "error" };
  }
}
const axios = require('axios');

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;    
  } else {
    delete axios.defaults.headers.common['Authorization'];    
  }
}
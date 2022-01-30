import React, { useState, useEffect } from 'react';

type Request = {
    url: string;
    method: string;
    data: any;
}

type Response = {
    success: () => {},
    error: () => {}
}

const useHttp  = ({ url, method, data}: Request) => {
  
   useEffect(() => {
        if(method === 'GET') {
            getRequest();
        } else if(method === 'POST') {
            postRequest();
        }
   }, [method]);

   const getRequest = async() => {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error('Unable to fetch results...');
      }
      const responseData = await response.json();
   }

   const postRequest = async() => {

   }

}

export default useHttp;
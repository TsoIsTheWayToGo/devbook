const express = require('express');
 const mongoose = require('mongoose');
 
 const app = express();
 // routes

 const port = process.env.PORT || 5000;

 app.listen(port, () => console.log(`Server is running on port ${port}`));
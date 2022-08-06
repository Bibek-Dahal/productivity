import multer from "multer";
import DatauriParser from 'datauri/parser.js'
import path from 'path';
const storage = multer.diskStorage({})
const upload = multer({storage:storage})


/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
// const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
export { upload}



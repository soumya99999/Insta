import multer from 'multer';

// Define the storage location and filename
const storage = multer.memoryStorage(); // Stores the file in memory

const upload = multer({ storage });

export default upload;

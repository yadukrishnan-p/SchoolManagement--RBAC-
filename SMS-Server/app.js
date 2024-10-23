const express =  require ('express');
const dotenv = require ('dotenv');
const cors = require ('cors');
const DataBase = require ('./config/DB');
const authRoutes = require ('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes'); 

const feeRoutes = require('./routes/feeRoutes');
const libraryRoutes = require('./routes/libraryRoutes');

dotenv.config();
const app = express();
app.use(express.json());
// Enable CORS for all routes and origins
app.use(cors());
DataBase();

app.use('/authRoute',authRoutes);
app.use('/api', studentRoutes);

app.use('/api', feeRoutes);
app.use('/api', libraryRoutes);

const corsOptions = {
    origin: 'http://localhost:3000', // Only allow requests from localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // If you are sending cookies or authentication headers
  };
  
  app.use(cors(corsOptions));
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
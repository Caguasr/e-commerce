const express = require('express');
const cors = require('cors');
const app = express();

const PORT  = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({extended: true}));
app.use('/api/products', require('./routes/productoRouter'));
app.listen( PORT , () => {
    console.log('SERVER RUN');
})
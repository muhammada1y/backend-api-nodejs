import expres from 'express';


const app = expres();
const PORT = 2000;



app.get('/', (req, res) => {
    res.send('server is rady')
})


app.listen(PORT, () => {
    console.log(`server is runing on ${PORT}`)
})
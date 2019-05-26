let express = require('express');
let app = express();

app.use(express.static('./'));
app.get('/', (req, res) => {
	res.sendFile('index.html');
});
console.log("Server connected");
app.listen(3000);

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = 8080;

const storagefile = './storage.json';

app.use(express.json());
app.use(cors());

app.get('/testroute', (req, res) => {
    res.json('testrouteresult');
});

app.post('/insertdata', async (req, res) => {
    const { userdata } = req.body;
    console.log('userdata: ' + userdata);
    fs.readFile(storagefile, "utf8", function (err, unparseddata) {
        if (err) { res.json({ success: false }); return; }
        const data = JSON.parse(unparseddata);
        data.storagedata.push(userdata);
        fs.writeFile(storagefile, JSON.stringify(data), function (err) {
            if (err) res.json({ success: false });
            else res.json({ success: true });
        });
    });
});

app.get('/getdata', async (req, res) => {
    fs.readFile(storagefile, 'utf8', function (err, data) {
        if (err) res.json({ success: false, data: null });
        else res.json({ success: true, storagedata: JSON.parse(data).storagedata });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

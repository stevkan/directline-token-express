const request = require('request');
const express = require('express');
const router = express.Router();

router.post('/directline/token', (req, res) => {
    
    const userId = (req.body.id)? req.body.id: `dl_${Date.now() + Math.random().toString(36)}`;
    const options = {
        method: 'POST',
        uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
        headers: {
            'Authorization': `Bearer ${process.env.directLineSecret}`
        },
        json: {
            User: { Id: userId }
        }
    };

    request.post(options, (error, response, body) => {
        if (!error && response.statusCode < 300) {
            res.send({ 
                token: body.token,
                userId: userId
             });
        }
        else {
            res.status(500).send('Call to retrieve token from DirectLine failed');
        }
    });
    
});

module.exports = router;
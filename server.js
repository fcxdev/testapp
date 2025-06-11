const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 👇 Webhook endpoint that also runs deploy.sh
app.post('/webhook', (req, res) => {
  console.log('✅ Webhook received:', req.body);

  exec('bash deploy.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Deploy failed: ${error.message}`);
      return res.status(500).send('Deploy failed');
    }
    if (stderr) console.error(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
    res.status(200).send('✅ React App Updated and Rebuilt');
  });
});

// Optional health check endpoint
app.get('/', (req, res) => {
  res.send('Webhook server is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

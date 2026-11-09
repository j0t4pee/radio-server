const express = require("express");
const cors = require("cors");
const { AccessToken } = require("livekit-server-sdk");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/get-token", (request, response) => {
  const roomName = "118.100"; 
  const participantName = request.body.playerName || `Piloto_${Math.floor(Math.random() * 1000)}`;
  
  const apiKey = "APIt6zYj4vbG48R";
  const apiSecret = "YBNegIe6ts1Zf6kVQmBjBPSBcG8UlYv49yIHZJSyseGA";

  try {
    const at = new AccessToken(apiKey, apiSecret, { identity: participantName });
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
    at.ttl = "12h";

    response.json({ token: at.toJwt() });
  } catch (error) {
    response.status(500).json({ error: "Erro ao gerar token" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor de Rádio Online na porta ${port}`);
});

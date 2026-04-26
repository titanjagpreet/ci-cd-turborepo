import express from 'express'
import { client } from "@repo/prisma/client"
import bcrypt from "bcrypt";

const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Hello");
})

app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "username and password required" });
        }

        const userExists = await client.user.findOne({username});
        if (userExists) {
            res.status(400).json({ message: "user already exists" });
            return;
        }

        const newPassword = await bcrypt.hash(password, 10);

        const createUser = await client.user.create({
            username,
            password: newPassword
        });

        if (createUser) {
            return res.status(201).json({ message: "user successfully created" })
        }

        return res.status(500).json({ message: "user creation failed" });

    } catch(e) {
        console.error(e);
        return res.status(500).json({ message: "unknown error" });
    }

})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
})
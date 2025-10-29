import { PrismaClient } from "@prisma/client";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(
  cors({
    origin: ["https://sos-project-form.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const localHost = `http://localhost:5000/`;

//GET
app.get("/", (req, res) => {
  res.send("🚀 I have all that I need in order to succeed!");
});

//GET - Reports
app.get("/reports", async (req, res) => {
  try {
    const reports = await prisma.report.findMany();

    if (reports.length === 0) {
      res.status(404).json({ message: "No reports available!" });
    }

    res.status(200).json({ Reports: reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/reports/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const report = await prisma.report.findUnique({
      where: { id: Number(id) },
    });

    if (!report) {
      return res
        .status(404)
        .json({ message: `No report with id "${id}" available!` });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/reports/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const reportsByUser = await prisma.report.findMany({
      where: { userId: Number(userId) },
    });

    if (reportsByUser.length === 0) {
      return res
        .status(404)
        .json({ message: "No reports available for this user!" });
    }

    res.status(200).json(reportsByUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashPassword, role },
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchingPassword) {
      return res.status(401).json({ message: "Passwords must match!" });
    }

    res.status(200).json({ message: "Login successfull", existingUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//POST - Form
app.post("/reports", async (req, res) => {
  try {
    const {
      id, // ignorado
      userId,
      ...rest
    } = req.body;

    const report = await prisma.report.create({
      data: {
        ...rest,
        date: new Date(rest.date || Date.now()),
        user: { connect: { id: Number(userId) } }, // ✅ o único campo relacional aceito
      },
    });

    res.status(201).json(report);
  } catch (error) {
    console.error("❌ Erro ao criar relatório:", error);
    res.status(500).json({ error: error.message });
  }
});

//DELETE
app.delete("/reports/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedReport = await prisma.report.delete({
      where: { id: Number(id) },
    });

    res
      .status(200)
      .json({ message: "Report deleted successfully!", deletedReport });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Server
app.listen(process.env.PORT || 5000, () => {
  console.log(
    `🔥 Selvagem! Server is running on ${
      process.env.PORT || "http://localhost:5000/"
    }`
  );
});

import { Router } from "express";
import protectRoute from "../middleware/auth";
import { certificate,getCertificates,getCertificateByid,deleteCertificate } from "../controllers/certificate.controller";
import { RoleEnum } from "../common";
const router=Router();
router.post("/create",protectRoute([RoleEnum[1]]),certificate);
router.get("/:userId",protectRoute([RoleEnum[1],RoleEnum[2]]),getCertificates);
router.get("/id/:id",protectRoute([RoleEnum[1],RoleEnum[2]]),getCertificateByid);
router.delete("/:id",protectRoute([RoleEnum[1],RoleEnum[2]]),deleteCertificate);


export default router;
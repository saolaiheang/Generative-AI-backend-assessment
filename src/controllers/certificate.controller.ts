import { Request, Response } from "express";
import { Certificate } from "../entity/certificate.entity";
import { AppDataSource } from "../config";
import { UserInfo } from "../entity/user.entity";

export const certificate = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate)
    try {
        const { userId, courseName } = req.body;
        const user = req.user as UserInfo;
        if (!userId || !courseName) {
            return res.status(400).json({ message: "UserId or CourseName" })
        }
        const saveCertificate = new Certificate();
        saveCertificate.user = user;
        saveCertificate.courseName = courseName;
        const result = await certificateRepo.save(saveCertificate);
        console.log(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getCertificates = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate)
    const userId = req.params.UserId;

    try {
        const certificates = await certificateRepo.find(
            {
                where: { user: { id: userId } }
            }
        );
        console.log(certificates);
        return res.status(200).json(certificates);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const getCertificateByid = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate)
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }
        const certificateRes = await certificateRepo.findOneBy({ id } );
        console.log(certificateRes);
        return res.status(200).json({ certificateRes });
    } catch (error) {
        console.log(error)
    }
}
export const deleteCertificate = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate)
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }
        const certificate = await certificateRepo.findOne({
            where: { id }
        });
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" })
        }
        await certificateRepo.delete(certificate);
        return res.status(200).json({ message: "Certificate deleted" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

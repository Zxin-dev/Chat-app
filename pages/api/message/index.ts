import { Request, Response } from "express";
import dataRequest from "@/pages/utils/dataRequest";
export default async function Handler(req: Request, res: Response) {
   
    switch (req.method) {
      case "GET":
        getAllChat(req , res)
        break;
      case "POST":
        createChat(req , res)
         break
      default:
            res.status(405).end()
            return;
    }
   

 async function createChat(req: Request, res: Response) {
  const { name, text } = req.body;
  console.log(name + ": " + text);
  const result = await dataRequest("insertOne", {
    document: {
      name: name,
      text: text,
    },
  });
  res.status(200).json(result);
}
async function getAllChat(req: Request, res: Response): Promise<void> {
    const result = await dataRequest("find", {});
    res.status(200).json(result);
  }
}
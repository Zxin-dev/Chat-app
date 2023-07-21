import dataRequest from "@/pages/utils/dataRequest";
import { Request,Response } from "express";
export default async function methodHandler(req: Request, res: Response): Promise<void> {
  const id:any = req.query.id;
  console.log(id);
  switch (req.method) {
    case "GET":
      getOneChat(id)
      break;
    case "DELETE":
      deleteChat(id);
      break;
    case "PATCH":
     updateChat(id)
     default:
      res.status(405).end()
      return;
  }

  async function deleteChat(id: number): Promise<void> {
    const result = await dataRequest("deleteOne", {
      filter: { _id: { $oid: id } },
    });
    res.status(200).json(result);
  }
  
   async function getOneChat(id:number): Promise<void> {
    const result = await dataRequest("findOne", {
      filter: { _id: { $oid: id } },
    });
    res.status(200).json(result);
  }
  async function updateChat(id:number): Promise<void> {
    const data = req.body;
    const result = await dataRequest("updateOne", {
      filter: { _id: { $oid: id } },
      update: {
        $set: {
          name:data.name,
          text: data.text,
        },
      },
    });
    res.status(200).json(result);
  }
}
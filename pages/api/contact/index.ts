import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from "@notionhq/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const data = JSON.parse(req.body);
        const entry: any = {
            parent: {
                database_id: `${process.env.NOTION_CONTACT_DATABASE_ID}`,
            },
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: `Contact Entry`,
                            },
                        },
                    ],
                },
                User: {
                    rich_text: [
                        {
                            text: {
                                content: `${data.user}`,
                            },
                        },
                    ],
                },
                Email: {
                    email: `${data.email}`,
                },
                Comment: {
                    rich_text: [
                        {
                            text: {
                                content: `${data.comment}`,
                            },
                        },
                    ],
                },
                Tags: {
                    type: "select",
                    select: {
                        name: "New",
                        color: "yellow",
                    },
                },
                Assigned: {
                    type: "people",
                    people: [
                        {
                            object: "user",
                            id: `${process.env.NOTION_ADMIN_ID}`,
                        },
                    ],
                },
            },
        };
        const notion = new Client({ auth: `${process.env.NOTION_KEY}` });
        const response = await notion.pages.create(entry);
        res.status(200).json(response);
    } else {
        res.status(200).json(
            "Hello! This API is set for POST method only. No content is available at GET."
        );
    }
}

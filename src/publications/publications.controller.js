import { response, request } from "express";
import Publication from "./publications.model.js";

export const publicationPost = async (req, res) => {
    try {
        const { title, category, mainText } = req.body;
        const userId = req.user._id;

        const publication = new Publication({ title, category, mainText, userId });


        const Title = `${title}`;
        const Category = `${category}`;
        const Main_Text = `${mainText}`;
        await publication.save();

        res.status(200).json({
            Title,
            Category,
            Main_Text
        });
    } catch (e) {
        console.log("Probably you don't enter a required field");
        console.log(e);
    }
}

export const publicationPut = async (req, res) => {

    try {
        const { __v, _id, status, ...rest } = req.body;
        const userId = req.user._id;
        const publicationId = req.params.id;

        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({
                msg: 'Publication not found'
            });
        }

        if (!publication.status) {
            return res.status(404).json({
                msg: 'Publication not found'
            });
        }

        const publicationUserId = publication.userId.toString();
        const requestingUserId = userId.toString();

        if (publicationUserId !== requestingUserId) {
            return res.status(403).json({
                msg: 'You do not have permissions to update this publication'
            });
        }

        Object.assign(publication, rest);

        await publication.save();

        res.status(200).json({
            msg: 'Publication update successfully'
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error processing request"
        });
    }
}

export const publicationDelete = async (req, res) => {
    try {
        const userId = req.user._id;
        const publicationId = req.params.id;
        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({
                msg: 'Publication not found'
            });
        }

        if (!publication.status) {
            return res.status(404).json({
                msg: 'Publication not found'
            });
        }

        const publicationUserId = publication.userId.toString();
        const requestingUserId = userId.toString();

        if (publicationUserId !== requestingUserId) {
            return res.status(403).json({
                msg: 'You do not have permissions to delete this publication'
            });
        }

        publication.status = false;

        await publication.save();

        res.status(200).json({
            msg: "Publication deleted successfully"
        })
    } catch (e) {
        console.error(e),
            res.status(500).json({
                msg: "Error processing request"
            });
    }
}

export const publicationGet = async (req, res = response) => {
    const { limit, from } = req.query;
    const query = { status: true};

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        publications
    })
}
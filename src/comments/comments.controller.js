import { response, request } from "express";
import Comment from "./comments.model.js";
import Publication from "../publications/publications.model.js";

export const commentPost = async (req, res) => {
    try {
        const { commentTitle, commentContent, publicationId} = req.body;

        const publication = await Publication.findById(publicationId);

        if (!publication) {
            return res.status(404).json({
                msg: 'Publication not found'
            });
        }

        if(!publication.status){
            return res.status(404).json({
                msg: 'Publication not found'
            });
        }



        const comment = new Comment({commentTitle, commentContent, publicationId});
        await comment.save();

        res.status(200).json({
            Title: commentTitle,
            Content: commentContent,
            msg: `You have done a comment on the post with the title: ${publication.title}`
        })
    } catch (e) {
        console.log("Probably you don't enter a required field");
        console.log(e);
    }
}



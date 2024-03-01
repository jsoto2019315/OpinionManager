import { response, request } from "express";
import Comment from "./comments.model.js";
import Publication from "../publications/publications.model.js";

export const commentPost = async (req, res) => {
    try {
        const { commentTitle, commentContent, publicationId } = req.body;
        const userId = req.user._id;
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


        const comment = new Comment({ commentTitle, commentContent, publicationId, userId });
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

export const commentPut = async (req, res) => {
    try {
        const { __v, _id, status, publicationId, userId, ...rest } = req.body;
        const userIdLogged = req.user._id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        if (!comment.status) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        const commentUserId = comment.userId.toString();
        const loggedUserId = userIdLogged.toString();

        if (commentUserId !== loggedUserId) {
            return res.status(403).json({
                msg: 'You do not have permissions to update this comment'
            });
        }

        Object.assign(comment, rest);

        await comment.save();

        res.status(200).json({
            msg: 'Comment update successfully'
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error processing request"
        });
    }
}

export const commentDelete = async (req, res) => {
    try {
        const userId = req.user._id;
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        if (!comment.status) {
            return res.status(404).json({
                msg: 'Comment not found'
            });
        }

        const commentUserId = comment.userId.toString();
        const loggedUserId = userId.toString();

        if (commentUserId !== loggedUserId) {
            return res.status(403).json({
                msg: 'You do not have permissions to update this comment'
            });
        }

        comment.status = false;

        res.status(200).json({
            msg: "Comment deleted successfully"
        })
        await comment.save();
    } catch (e) {
        console.error(e),
            res.status(500).json({
                msg: "Error processing request"
            });
    }
}
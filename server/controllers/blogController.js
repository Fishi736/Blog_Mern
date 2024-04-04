
const HttpError = require('../models/errorModel')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')





//POST : api/create
//Protected
const createBlog = async (req, res, next) => {
    try {

        let { title, category, description } = req.body
        if (!title || !category || !description || !req.files) {
            return next(new HttpError('Fill all the fields.', 422))
        }

        const { thumbnail } = req.files
        if (thumbnail.size > 2000000) {
            return next(new HttpError('Thumbnail too big. File should be less than 2mb'))
        }
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err), 422)
            } else {
                const newBlog = await Blog.create({ title, description, category, thumbnail: newFilename, creator: req.user.id })
                if (!newBlog) {
                    return next(new HttpError("Post couldn't be created."), 422)
                }

                // find user an increse post count by 1
                const currentUser = await User.findById(req.user.id);
                const userBlogCount = currentUser.blogs + 1
                await User.findByIdAndUpdate(req.user.id, { blogs: userBlogCount })


                res.status(201).json(newBlog)

            }
        })


    } catch (error) {
        return next(new HttpError(error))
    }

}



//Get :api/blogs
const getAllBlogs = async (req, res, next) => {
    try {
        const allblogs = await Blog.find().sort({ updatedAt: -1 })
        res.json(allblogs)
    } catch (error) {
        return next(new HttpError(error))

    }
}



//Get :api/blogs
const getUserBlogs = async (req, res, next) => {
    try {
        const id = req.params.id
        const allblogs = await Blog.find({ creator: id }).sort({ updatedAt: -1 })
        res.json(allblogs)
    } catch (error) {
        return next(new HttpError(error))

    }
}



//Get :api/blogs/:id
const getBlogDetails = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return next(new HttpError('Not Found', 404))
        }
        res.status(200).json(blog)

    } catch (error) {
        return next(new HttpError(error))

    }
}



//POST :api/create/:id
const editBlog = async (req, res, next) => {
    try {
        let fileName;
        let newFilename;
        let updatedBlog;
        const blogId = req.params.id;
        let { title, category, description } = req.body;

        if (!title || !category || description.length < 12) {
            return next(new HttpError('Fill all the fields.', 422))
        }
        if (!req.files) {
            updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, category, description }, { new: true })
        } else {
            //delete the old thumbnail
            const oldBlog = await Blog.findById(blogId);

            fs.unlink(path.join(__dirname, '..', 'uploads', oldBlog.thumbnail), (err) => {
                if (err) {
                    return next(new HttpError(err))
                }
            })
            //upload new thumbnail 
            const { thumbnail } = req.files;
            if (thumbnail.size > 2000000) {
                return next(new HttpError("Thumbnail too big.Should be less than 2mb.", 422))
            }




            fileName = thumbnail.name;
            let splittedFilename = fileName.split('.')
            newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                if (err) {
                    return next(new HttpError(err), 422)
                }

            })

            updatedBlog = await Blog.findByIdAndUpdate(blogId, { title, category, description, thumbnail: newFilename }, { new: true })

        }
        if (!updatedBlog) {
            return next(new HttpError("Couldn't update post.", 400))
        }
        res.status(200).json(updatedBlog)





    } catch (error) {
        return next(new HttpError(error))

    }
}




//POST :api/delete/:id
const deleteBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id;
        if (!blogId) {
            return next(new HttpError("Post unavailable.", 400))
        }
        const blog = await Blog.findById(blogId)
        const fileName = blog?.thumbnail;
        if (req.user.id == blog.creator) {
            //delete thumbnail from uploads folder
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if (err) {
                    return next(new HttpError(err))
                } else {
                    await Blog.findByIdAndDelete(blogId)
                    //find user and reduce post count by 1
                    const currentUser = await User.findById(req.user.id)
                    const userBlogsCount = currentUser?.blogs - 1;
                    await User.findByIdAndUpdate(req.user.id, { blogs: userBlogsCount })
                    res.json(`Post deleted ${blogId}  successfully.`,)

                }
            })

        }

    } catch (error) {
        return next(new HttpError(error))

    }
}




module.exports = { createBlog, getAllBlogs, getUserBlogs, getBlogDetails, editBlog, deleteBlog }
import React from 'react'
import {NavLink} from 'react-router-dom';

const BlogDetails = ( {post} ) => {
  return (
    <div className=''>
        <NavLink to={`/blog/${post.id}`}>
            <span className='text-lg font-bold hover:underline'>{post.title}</span>
        </NavLink>
        <p className='text-sm mt-[4px]'>
            By
            <span className='italic'> {post.author} </span>
            on {" "}
            <NavLink to={`/categories/${post.category.replaceAll(" ", "-")}`}>
                <span className='underline font-bold hover:text-blue-600'>{post.category}</span>
            </NavLink>
        </p>
        <p className='text-sm mt-[4px] '>Posted on {post.date}</p>
        <p className='text-md mt-[14px]'>{post.content}</p>
        <div className='flex gap-x-3'>
          {post.tags.map( (tag, index) => (
            <NavLink key={index} to={`/tags/${tag.replaceAll(" ", "-")}`}>
              <span className='text-blue-600 underline font-bold text-xs mt-[5px] hover:text-blue-900'>{`#${tag}`}</span>
            </NavLink>
          ))}
        </div>

    </div>
  )
}

export default BlogDetails

import React, { useContext, useEffect, useState } from 'react'
import { useLocation , useNavigate} from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { baseUrl } from '../baseUrl';

const BlogPage = () => {

  const newBaseUrl = "https://codehelp-apis.vercel.app/api/"
  const [blog, setBlog] = useState(null);
  const [relatedblogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const {setLoading,  loading} = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs(){
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    console.log("Url is: ")
    console.log(url)

    try{
      const res = await fetch(url);
      const data = await res.json();
      setBlog(data.blog); 
      setRelatedBlogs(data.relatedblogs || []);
    }

    catch(error){
      console.log("Error: ")
      console.log(error);
      setBlog(null);
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect( () => {
    if(blogId){
      fetchRelatedBlogs();
    }
  }, [location.pathname])
  return (
    <div className=''>
      <Header/>
     <div className='w-11/12 max-w-[670px]  flex flex-col justify-center items-center gap-y-9 my-24 mx-auto'> 
      <div className='rounded-md border-2 text-center px-4 py-1 w-28 cursor-pointer mb-1'>
        <button 
        onClick={() => navigation(-1)}>Back</button>
      </div>
      {
        loading ? <p>Loading</p> : blog ? (
          <div className=''>
            <BlogDetails post= {blog}/>
            <h2 className='mt-[10px] font-bold'>Related Blogs</h2>
            {
              relatedblogs.map( (post) => (
                <div key = {post.id}>
                  <BlogDetails post={post} />
                </div>
              ))
            }
          </div>
        ): (
          <div>
            <p>No Blog found</p>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default BlogPage;



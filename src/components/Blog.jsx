import './Blog.css';

function Blog(props) {
  const toggleSidebar = props.toggleSidebar;
  
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Our Platform",
      date: "January 15, 2024",
      author: "John Doe",
      excerpt: "A comprehensive guide to help you get started with our platform and make the most of its features.",
    },
    {
      id: 2,
      title: "10 Tips for Better Data Visualization",
      date: "February 20, 2024",
      author: "Jane Smith",
      excerpt: "Learn how to create stunning and informative data visualizations that engage your audience.",
    },
    {
      id: 3,
      title: "Best Practices for Dashboard Design",
      date: "March 10, 2024",
      author: "Alex Johnson",
      excerpt: "Discover the key principles and best practices for designing effective and user-friendly dashboards.",
    },
  ];

  return (
    <main className="content">
      <button
        className="sidebar-toggle-btn"
        onClick={(e) => {
          e.preventDefault();
          if (toggleSidebar) toggleSidebar();
        }}
      >
        ☰
      </button>
      <div className="page-card">
        <h1>Our Blog</h1>
        <div className="blog-posts">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <h2>{post.title}</h2>
              <p className="post-meta">By {post.author} | {post.date}</p>
              <p className="post-excerpt">{post.excerpt}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Blog;

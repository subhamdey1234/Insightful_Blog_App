import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, MessageCircle, ThumbsUp, Loader2, Menu, X, Search } from 'lucide-react';

const categories = [
  { name: 'Programming', tag: 'programming', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80' },
  { name: 'Economy', tag: 'finance', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80' },
  { name: 'Social Media', tag: 'socialmedia', image: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80' },
  { name: 'Environmental', tag: 'environment', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80' },
  { name: 'Movies', tag: 'movies', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80' },
];

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dev.to/api/articles?per_page=15&tag=${selectedCategory.tag}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
              InsightfulBlog
            </h1>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    selectedCategory.name === category.name
                      ? 'text-emerald-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => {
                    setSelectedCategory(category);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    selectedCategory.name === category.name
                      ? 'text-emerald-400 bg-gray-700'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
            {selectedCategory.name}
          </h2>
          <div 
            className="w-full h-48 rounded-lg mb-8 bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedCategory.image})` }}
          />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the latest insights and stories in {selectedCategory.name.toLowerCase()}.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <img
                  src={post.cover_image || selectedCategory.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 line-clamp-2 hover:line-clamp-none">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4 line-clamp-3 hover:line-clamp-none">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <span className="flex items-center text-gray-400">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {post.positive_reactions_count}
                      </span>
                      <span className="flex items-center text-gray-400">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments_count}
                      </span>
                      <span className="flex items-center text-gray-400">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {post.reading_time_minutes} min read
                      </span>
                    </div>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 flex items-center"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No articles found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axiosSecure.get("/products/featured");
      setProducts(res.data);
    };

    fetchProducts();
  }, [axiosSecure]);

  //  Handle Upvote
  const handleUpvote = async (productId) => {
    if (!user) return navigate("/login");
    try {
      const res = await axiosSecure.post(
        `/products/featured/${productId}/upvote`,
        { userEmail: user.email }
      );

      setProducts((prev) =>
        prev
          .map((p) => (p._id === productId ? res.data : p))
          .sort((a, b) => b.votes - a.votes)
      );
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };
import { useState, useEffect } from "react";
import E_Card from "../../components/E_Card";
import axios from "axios";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:3000/product");
        setProducts(res?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err?.response.data.error || err?.message);
      }
    }
    fetchProducts();
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <CustomSpinner />;
  }

  return (
    <section className="bg-[#1C1E2D]">
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products?.map((product) => {
          return (
            <E_Card key={product._id} product={product} id={product._id} />
          );
        })}
      </div>
    </section>
  );
}

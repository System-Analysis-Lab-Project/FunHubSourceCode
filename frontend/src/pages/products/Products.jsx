// import React from "react";
import E_Card from "../../components/E_Card";
import products from "../../products";
export default function Products() {

  return (
    <section className="dark:bg-[#1C1E2D]">
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
      {products?.map((product) => {
                return (
                  <E_Card
                    key={product._id}
                    product={product}
                    id={product._id}
                  />
                );
              })}
      </div>
    </section>
  );
}

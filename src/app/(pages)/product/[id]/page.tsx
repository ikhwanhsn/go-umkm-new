"use client";

import Image from "next/image";
import CardProduct from "@/components/CardProduct";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useSession } from "next-auth/react";

const DetailProduct = () => {
  const { id } = useParams();
  const { data, status: session } = useSession();
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [kategoriProduk, setKategoriProduk] = useState("Fashion");
  const [linkProduk, setLinkProduk] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`/api/products/${id}`, fetcher);
  const {
    data: dataLiked,
    error: errorLiked,
    isLoading: isLoadingLiked,
  } = useSWR(`/api/favorite/${id}`, fetcher);

  const addLikedProduct = async () => {
    if (!isLiked) {
      const response = await fetch(`/api/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data?.user?.email,
          product_id: id,
        }),
      });
      const res = await response.json();
      if (res.success) {
        setIsLiked(true);
      }
    } else {
      const response = await fetch(`/api/favorite?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res.success) {
        setIsLiked(false);
      }
    }
  };

  useEffect(() => {
    if (dataProduct) {
      const product = dataProduct.product;
      setNamaProduk(product?.name);
      setDeskripsiProduk(product?.description);
      setImageURL(product?.image);
      setHargaProduk(product?.price);
      setKategoriProduk(product?.category);
      setLinkProduk(product?.link);
    }
  }, [dataProduct]);
  useEffect(() => {
    if (dataLiked) {
      if (dataLiked?.length > 0) {
        setIsLiked(true);
      }
    }
  }, [dataLiked]);

  return (
    <main className="min-h-screen lg:px-12 md:px-8 px-5 mt-5">
      <h1 className="text-xl font-bold mb-1">Detail Product</h1>
      <section className="flex md:flex-row flex-col mt-3 mb-5 gap-x-10 gap-y-5">
        <section className="md:w-1/2 w-full">
          <Image
            src={imageURL}
            alt="image-product"
            width={200}
            height={200}
            className="md:w-80 w-full h-80 object-cover rounded-sm"
          />
        </section>
        <aside className="md:mt-0 mt-3">
          <h2 className="text-xl font-semibold mb-3">{namaProduk}</h2>
          <p>{deskripsiProduk}</p>
          <section className="flex items-center gap-1 mt-5">
            <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
              Chat penjual
            </button>
            <a
              className="btn bg-orange-500 text-white border-none hover:bg-orange-600"
              href={linkProduk}
              target="_blank"
            >
              Beli sekarang
            </a>
            <button
              className="btn btn-outline btn-error"
              onClick={addLikedProduct}
            >
              {isLiked ? <GoHeartFill size={20} /> : <GoHeart size={20} />}
            </button>
          </section>
        </aside>
      </section>
      <SimilarProduct id={id} />
    </main>
  );
};

export default DetailProduct;

const SimilarProduct = ({ id }: { id: any }) => {
  const [product, setproduct] = useState([]);
  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`/api/products`, fetcher);
  useEffect(() => {
    if (dataProduct) {
      setproduct(dataProduct);
    }
  }, [dataProduct]);

  return (
    <main>
      <h1 className="text-xl font-bold mb-1">Other Product</h1>
      <section className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mx-auto mt-3 gap-5">
        {product.length > 0 &&
          product.map((item: any) => (
            <CardProduct
              key={item._id}
              id={item._id}
              myRef="product"
              src={item.image}
              name={item.name}
              mitra={"mitra 1"}
              price={item.price}
            />
          ))}
      </section>
    </main>
  );
};

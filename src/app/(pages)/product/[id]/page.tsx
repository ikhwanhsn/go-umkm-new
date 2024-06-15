"use client";

import Image from "next/image";
import CardProduct from "@/components/CardProduct";
import useSWR from "swr";
import { useParams, useRouter } from "next/navigation";
import { fetcher } from "@/libs/swr/fetcher";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useSession } from "next-auth/react";
import Link from "next/link";

const DetailProduct = () => {
  const { id } = useParams();
  const { data, status: session } = useSession();
  const [idToko, setIdToko] = useState("");
  const [namaToko, setNamaToko] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nib, setNib] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [deskripsiProduk, setDeskripsiProduk] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [hargaProduk, setHargaProduk] = useState("");
  const [kategoriProduk, setKategoriProduk] = useState("Fashion");
  const [linkProduk, setLinkProduk] = useState("");
  const [telephone, setTelephone] = useState("");
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
  } = useSWR(`/api/favorite/${id}?email=${data?.user?.email}`, fetcher);

  const addLikedProduct = async () => {
    if (isLiked === false) {
      setIsLiked(true);
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
    }
    if (isLiked === true) {
      setIsLiked(false);
      const response = await fetch(`/api/favorite/${id}`, {
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
      // console.log(dataProduct);
      const product = dataProduct.product;
      setIdToko(product?.store_id);
      setNamaProduk(product?.name);
      setDeskripsiProduk(product?.description);
      setImageURL(product?.image);
      setHargaProduk(product?.price);
      setKategoriProduk(product?.category);
      setLinkProduk(product?.link);
      const phoneNumber = dataProduct?.telp;
      const formattedNumber = phoneNumber?.replace(/^0/, "62");
      const whatsappLink = `https://wa.me/${formattedNumber}`;
      setTelephone(whatsappLink);
      setNamaToko(dataProduct?.namaToko);
      setKelurahan(dataProduct?.kelurahan);
      setAlamat(dataProduct?.alamat);
      setNib(dataProduct?.nib);
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
      <h1 className="text-xl font-bold mb-5">Detail Product</h1>
      <section className="flex md:grid grid-cols-12 flex-col mt-3 mb-8 gap-y-5">
        <section className="md:w-80 w-full col-span-4">
          <Image
            src={imageURL}
            alt="image-product"
            width={200}
            height={200}
            className="md:w-80 w-full h-80 rounded-sm object-cover"
          />
        </section>
        <aside className="md:mt-0 mt-3 col-span-8">
          <h2 className="text-xl font-semibold mb-3">{namaProduk}</h2>
          <p>{deskripsiProduk}</p>
          <h2 className="mt-1">
            <span className="font-semibold">Harga :</span> {hargaProduk}
          </h2>
          <h2 className="mt-1">
            <span className="font-semibold">Toko :</span>{" "}
            <Link
              href={`/store/${idToko}`}
              className="hover:text-blue-500 capitalize"
            >
              {namaToko}
            </Link>
          </h2>
          <h2 className="mt-1 capitalize">
            <span className="font-semibold">Alamat :</span> {alamat}
          </h2>
          <h2 className="mt-1">
            <span className="font-semibold">NIB :</span> {nib}
          </h2>
          <section className="flex items-center gap-1 mt-5">
            <a
              href={telephone}
              target="_blank"
              className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Hubungi via Whatsapp
            </a>
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
      <SimilarProduct id={id} kelurahan={kelurahan} />
    </main>
  );
};

export default DetailProduct;

type SimilarProductProps = {
  id: any;
  kelurahan: string;
};

const SimilarProduct = ({ id, kelurahan }: SimilarProductProps) => {
  const [product, setproduct] = useState([]);
  const {
    data: dataProduct,
    error: errorProduct,
    isLoading: isLoadingProduct,
  } = useSWR(`/api/products?kelurahan=${kelurahan}&limit=10`, fetcher);
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
              mitra={item.storeName}
              price={item.price}
            />
          ))}
      </section>
    </main>
  );
};

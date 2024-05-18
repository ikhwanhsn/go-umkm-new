const EditStore = () => {
  return (
    <main className="w-full min-h-screen">
      <section className="w-1/2 mx-auto text-center">
        <h1 className="mt-5 text-xl text-orange-500 font-bold">Edit Toko</h1>
        <input
          type="text"
          placeholder="Nama toko..."
          className="input input-bordered w-full bg-gray-50 mt-5"
        />
        <br />
        <section className="text-left space-x-3">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs bg-gray-50 mt-3"
          />
        </section>
        <textarea
          placeholder="Deskripsi..."
          maxLength={300}
          rows={4}
          className="w-full bg-gray-50 textarea textarea-bordered text-base mt-3"
        ></textarea>
        <br />
        <input
          type="text"
          placeholder="Kota..."
          className="input input-bordered w-full bg-gray-50 mt-2"
        />
        <br />
        <input
          type="text"
          placeholder="Kecamatan..."
          className="input input-bordered w-full bg-gray-50 mt-3"
        />
        <br />
        <section className="space-x-2">
          <button className="btn bg-orange-500 text-white border-none hover:bg-orange-600 mt-5">
            Simpan
          </button>
          <button className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white mt-5">
            Batal
          </button>
        </section>
      </section>
    </main>
  );
};

export default EditStore;

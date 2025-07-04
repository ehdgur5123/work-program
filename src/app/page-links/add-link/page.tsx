export default function AddLink() {
  return (
    <>
      <h1 className="bg-red-500 text-center text-4xl p-5">링크 추가</h1>
      <form action="" className="flex">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              id="url"
              placeholder="URL을 입력하세요."
              className="bg-white"
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="tag">태그</label>
            <input type="tag" className="bg-white" />
          </div>
        </div>
        <button type="submit">확인</button>
      </form>
    </>
  );
}

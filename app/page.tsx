import SearchBooks from "@/components/SearchBooks";
import BookShelf from "@/components/BookShelf";

export default async function Index() {
  return (
    <>
      <BookShelf />
      <div className="bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-5">
            What have you read lately?
          </h2>
          <SearchBooks></SearchBooks>
        </div>
      </div>
    </>
  );
}

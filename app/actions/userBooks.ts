"use server"

import {getUser} from "@/app/actions/user";
import {createClient} from "@/utils/supabase/server";
import {prisma} from "@/utils/prisma";
export const addBookToShelf = async (key: string) => {
  console.log('hi')
  const user = await getUser()

    if (!user) {
      console.log("User not found");
      return;
    }

    // find the book by its key
    const book = await prisma.books.findUnique({
      where: {open_library_key: key},
      select: {id: true}
    });

    if (!book) {
      console.log("Book not found");
      return;
    }

    // insert into 'user_books' table
    const userBooks = await prisma.user_books.create({
      data: {
        user_id: user.id,
        book_id: book.id,
      }
    });

    console.log('Added to shelf', book.id);
}
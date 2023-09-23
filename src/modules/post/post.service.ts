import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const inserIntoDb = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({ data });
  return result;
};
const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = +limit * +page - limit;
  const take = +limit;

  console.log(skip, take);

  const result = await prisma.post.findMany({
    skip,
    take,
    include: { author: true, category: true },
    orderBy:
      sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
    where: {
      OR: [
        {
          title: { contains: searchTerm, mode: "insensitive" },
        },
        {
          author: {
            name: { contains: searchTerm, mode: "insensitive" },
          },
        },
      ],
    },
  });
  return result;
};

export const PostService = {
  inserIntoDb,
  getAllPost,
};

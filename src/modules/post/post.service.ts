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

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
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
    const total = await tx.post.count();
    return { data: result, total };
  });
};

export const PostService = {
  inserIntoDb,
  getAllPost,
};

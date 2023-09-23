import { Post, PrismaClient } from "@prisma/client";
import { resourceUsage } from "process";

const prisma = new PrismaClient();

const inserIntoDb = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({ data });
  return result;
};
const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;

  const skip = +limit * +page - limit || 0;
  const take = +limit || 10;

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

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  console.log(id, payload);
  const result = await prisma.post.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: { id },
  });
  return result;
};

/* Aggregation Groouping and Summirize */

const learnAggregation = async () => {
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true,
  //     categoryId: true,
  //   },
  //   _count: {
  //     categoryId: true,
  //   },
  //   _sum: {
  //     authorId: true,
  //   },
  // });
  // return result;
  const result = prisma.post.groupBy({
    by:['title'],
    _count:{
      title:true 
    }
  })
  return result
};

export const PostService = {
  inserIntoDb,
  getAllPost,
  updatePost,
  deletePost,
  learnAggregation
};

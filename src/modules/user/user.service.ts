import { PrismaClient, Profiles, User } from "@prisma/client";

const prisma = new PrismaClient();
const inserIntoDb = async (data: User): Promise<User> => {
  const result = await prisma.user.create({
    data,
  });
  return result;
};

const insertOrUpdateProfile = async (data: Profiles): Promise<Profiles> => {
  const isExist = await prisma.profiles.findUnique({
    where: { userId: data.userId },
  });

  if (isExist) {
    const result = await prisma.profiles.update({
      where: {
        userId: data.userId,
      },
      data: {
        bio: data.bio,
      },
    });
    return result;
  }

  const result = await prisma.profiles.create({
    data,
  });
  return result;
};
const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: {
      name: false,
    },
    // include: {
    //   Profiles: true,
    // },
  });
};

const getSingleUser = async (id: number): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: { id },
    include: { Profiles: true },
  });

  return result;
};

export const UserService = {
  inserIntoDb,
  insertOrUpdateProfile,
  getAllUser,
  getSingleUser,
};

import app from "./app";
const port = process.env.PORT || 5000;

const main = async () => {
  app.listen(port, () => {
    console.log("server listern on", port);
  });
};

main();

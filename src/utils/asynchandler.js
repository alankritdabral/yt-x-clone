const asyncHndler = (responseHandler) => {
  (req, res, next) => {
    Promise.resolve(responseHandler(req, res, next)).catch((err) =>
      console.log(err)
    );
  };
};

export {asyncHndler}

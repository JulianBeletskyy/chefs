function asyncWrapper(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

export default asyncWrapper;
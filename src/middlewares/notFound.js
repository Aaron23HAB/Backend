const notFound = (req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Ha ocurrido un error al registrarse o logearse',
  });
};

export { notFound };

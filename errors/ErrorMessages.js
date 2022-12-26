const errorMessagesMovies = {
  badRequestError: 'Переданы некорректные данные фильма.',
  notFoundError: 'Запрашиваемая карточка не найдена.',
  forbiddenError: 'Недостаточно прав',
};

const errorMessagesUsers = {
  conflictError: 'Пользователь с данным email уже существует',
  badRequestError: 'Переданы некорректные данные пользователя.',
  notFoundError: 'Запрашиваемый пользователь не найден.',
};

const errorMessagesAuth = {
  tokenNotFound: 'Токен не найден.',
  unauthorizedError: 'Токен не прошел верификацию.',
};

const errorMessagesRoutes = {
  notFoundError: 'Запрашиваемая страница не найдена.',
};

module.exports = {
  errorMessagesMovies, errorMessagesUsers, errorMessagesAuth, errorMessagesRoutes,
};

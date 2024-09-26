
const ru = {
  translation: {
    headers: {
      chat: 'Chat',
      exit: 'Выйти',
    },
    loginPage: {
      enter: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      withoutAccount: 'Нет аккаунта?',
      registration: 'Регистрация',
      error: 'Неверные имя пользователя или пароль',
      isLoading: 'В процессе...',
    },
    chatMainPage: {
      channels: 'Каналы',
      placeholderMessage: 'Введите сообщение...',
      toastError: 'Ошибка соединения',
      messages: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      },
    },
    signUpPage: {
      placeholder: {
        min3max20: 'От 3 до 20 символов',
        min6: 'Не менее 6 символов',
        samePassword: 'Пароли должны совпадать',
      },
      errorPassword: 'Такой пользователь уже существует',
      errorRegistration: 'Произошла ошибка при регистрации',
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      signUp: 'Зарегистрироваться',
    },
    notFoundPage: {
      pageNotFound: 'Страница не найдена',
    },
    modalWindows: {
      cancel: 'Отмена',
      submit: 'Отправить',
      channelManagment: 'Управление каналом',
      addChannel: {
        addChannel: 'Добавить канал',
        channelName: 'Имя канала',
        toastAddName: 'Канал создан',
        toastErrorAddName: 'Ошибка при создании канала',
      },
      renameChannel: {
        rename: 'Переименовать',
        renameChannel: 'Переименовать канал',
        newName: 'Имя канала',
        toastRenameChannel: 'Канал переименован',
      },
      deleteChannel: {
        deleteChannel: 'Удалить канал',
        confirmation: 'Уверены?',
        delete: 'Удалить',
        toastDeleteChannel: 'Канал удалён',
        toastErrorAddName: 'Ошибка при удалении канала',
      },
    },
    schema: {
      requiredField: 'Обязательное поле',
      min3max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      samePassword: 'Пароли должны совпадать',
      sameNameChannel: 'Это имя канала уже используется',
      enterNewName: 'Введите новое имя канала',
    },
  },
};

export default ru;

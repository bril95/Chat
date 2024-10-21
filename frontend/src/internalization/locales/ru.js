
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
    },
    chatMainPage: {
      channels: 'Каналы',
      placeholderMessage: 'Введите сообщение...',
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
    modalWindows: {
      cancel: 'Отмена',
      submit: 'Отправить',
      channelManagment: 'Управление каналом',
      addChannel: {
        addChannel: 'Добавить канал',
        channelName: 'Имя канала',
        emptyChannel: 'Необходимо ввести название канала',
        sameNameChannel: 'Это имя канала уже используется',
      },
      renameChannel: {
        rename: 'Переименовать',
        renameChannel: 'Переименовать канал',
        newName: 'Имя канала',
      },
      deleteChannel: {
        deleteChannel: 'Удалить канал',
        confirmation: 'Уверены?',
        delete: 'Удалить',
      },
    },
    schema: {
      requiredField: 'Обязательное поле',
      sameNameChannel: 'Это имя канала уже используется',
      min3max20: 'От 3 до 20 символов',
      min6: 'Не менее 6 символов',
      samePassword: 'Пароли должны совпадать',
    },
  },
};

export default ru;

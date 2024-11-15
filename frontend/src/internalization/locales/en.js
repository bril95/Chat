const en = {
  translation: {
    headers: {
      hexletChat: 'Chat',
      exit: 'Logout',
    },
    loginPage: {
      enter: 'Login',
      username: 'Your nickname',
      password: 'Password',
      withoutAccount: "Don't have an account?",
      registration: 'Sign Up',
      errorRequest: 'Invalid username or password',
      errorNetwork: 'An error occurred during login',
    },
    chatMainPage: {
      channels: 'Channels',
      placeholderMessage: 'Enter a message...',
      messages: {
        key_zero: '{{count}} messages',
        key_one: '{{count}} message',
        key_other: '{{count}} messages',
      },
    },
    signUpPage: {
      placeholder: {
        min3max20: 'From 3 to 20 characters',
        min6: 'At least 6 characters',
        samePassword: 'Passwords must match',
      },
      errorPassword: 'This user already exists',
      errorRegistration: 'An error occurred during registration',
      registration: 'Sign Up',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm password',
      signUp: 'Register',
    },
    notFoundPage: {
      pageNotFound: 'Page not found',
    },
    modalWindows: {
      cancel: 'Cancel',
      submit: 'Submit',
      channelManagment: 'Channel management',
      addChannel: {
        addChannel: 'Add channel',
        channelName: 'Channel name',
        emptyChannel: 'Channel name is required',
        sameNameChannel: 'This channel name is already in use',
      },
      renameChannel: {
        rename: 'Rename',
        renameChannel: 'Rename channel',
        newName: 'New channel name',
      },
      deleteChannel: {
        deleteChannel: 'Delete channel',
        confirmation: 'Are you sure?',
        delete: 'Delete',
      },
    },
    schema: {
      requiredField: 'Required field',
      min3max20: 'From 3 to 20 characters',
      min6: 'At least 6 characters',
      samePassword: 'Passwords must match',
      sameNameChannel: 'This channel name is already in use',
    },
    footer: {
      langRu: 'Русский',
      langEn: 'English',
      author: 'Bril Vadim',
    },
  },
};

export default en;

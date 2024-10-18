const en = {
  translation: {
    headers: {
      hexletChat: 'Hexlet Chat',
      exit: 'Logout',
    },
    loginPage: {
      enter: 'Login',
      username: 'Your nickname',
      password: 'Password',
      withoutAccount: "Don't have an account?",
      registration: 'Sign Up',
      error: 'Invalid username or password',
      isLoading: 'Loading...',
    },
    chatMainPage: {
      channels: 'Channels',
      placeholderMessage: 'Enter a message...',
      toastError: 'Connection error',
      messages: {
        key_zero: '{{count}} messages',
        key_one: '{{count}} message',
        key_few: '{{count}} messages',
        key_many: '{{count}} messages',
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
        toastAddName: 'Channel created',
        toastErrorAddName: 'Error creating channel',
      },
      renameChannel: {
        rename: 'Rename',
        renameChannel: 'Rename channel',
        newName: 'New channel name',
        toastRenameChannel: 'Channel renamed',
      },
      deleteChannel: {
        deleteChannel: 'Delete channel',
        confirmation: 'Are you sure?',
        delete: 'Delete',
        toastDeleteChannel: 'Channel deleted',
        toastErrorAddName: 'Error deleting channel',
      },
    },
    schema: {
      requiredField: 'Required field',
      min3max20: 'From 3 to 20 characters',
      min6: 'At least 6 characters',
      samePassword: 'Passwords must match',
      sameNameChannel: 'This channel name is already in use',
      enterNewName: 'Enter a new channel name',
    },
  },
};

export default en;

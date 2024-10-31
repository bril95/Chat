interface LoginForm {
  username: string;
  password: string;
}

interface SignUpForm extends LoginForm {
  confirmPassword: string;
}

interface MainChatForm {
  name: string;
}

export { type LoginForm, type SignUpForm, type MainChatForm };

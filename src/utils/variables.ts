const { env } = process as { env: { [key: string]: string } };

export const {
  PG_URL,
  MAIL_USER,
  MAIL_PASS,
  SIGN_UP_ACTIVATION_SECRET,
  SIGN_IN_SECRET,
  FORGOT_PASSWORD_SECRET,
} = env;

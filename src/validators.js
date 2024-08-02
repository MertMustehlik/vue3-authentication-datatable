import { helpers } from '@vuelidate/validators';

export const userPassRegex = helpers.regex(/^(?=.*[A-Za-z])(?=.*\d).+$/);

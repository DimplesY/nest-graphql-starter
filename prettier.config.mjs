/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  plugins: ['prettier-plugin-prisma'],
}

export default config
